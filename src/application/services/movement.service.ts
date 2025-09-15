import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Account, Movement, MovementType } from '@/domain';
import { CreateMovementRequestDTO } from '../dto';
import { randomUUID } from 'node:crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { RabbitPublisher } from '@/infra/publisher/rabbit.publisher';

@Injectable()
export class MovementService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly dataSource: DataSource,
    private readonly rabbit: RabbitPublisher,
  ) {}

  async createMovement(dto: CreateMovementRequestDTO): Promise<Movement> {
    const account = await this.accountRepository.findOne({
      where: { id: dto.accountId },
    });

    if (!account) {
      throw new NotFoundException(
        'Account not found for movement accountID provided',
      );
    }

    const qr = this.dataSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();

    try {
      const movementRepo = qr.manager.getRepository(Movement);

      const { sum } = await movementRepo
        .createQueryBuilder('m')
        .select(
          "COALESCE(SUM(CASE WHEN m.type = 'CREDIT' THEN m.amount ELSE -m.amount END), 0)",
          'sum',
        )
        .where('m.account_id = :accountId', { accountId: account.id })
        .getRawOne<{ sum: string }>();

      const balance = Number(sum ?? 0);

      const usedLimit = Math.max(0, -balance);
      const availableLimit = Math.max(0, account.creditLimit - usedLimit);

      if (dto.type === 'DEBIT') {
        const capacidade = balance + availableLimit;
        if (dto.amount > capacidade) {
          throw new BadRequestException(
            'Insufficient funds and credit limit for debit',
          );
        }
      }

      const entity = movementRepo.create(
        Movement.build(
          randomUUID(),
          account.id,
          account,
          dto.amount,
          dto.type as unknown as MovementType,
          dto.description,
        ),
      );

      const saved = await movementRepo.save(entity);

      await qr.commitTransaction();

      await this.rabbit.publish(
        {
          movementId: saved.id,
          accountId: saved.accountId,
          amount: saved.amount,
          movementType: saved.type,
          description: saved.description ?? null,
        },
        'movements_queue',
      );

      return saved;
    } catch (e) {
      await qr.rollbackTransaction();
      await qr.release();
      throw e;
    }
  }
}
