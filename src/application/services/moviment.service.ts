import { Injectable, NotFoundException } from '@nestjs/common';
import { Account, Moviment, MovimentType } from '@/domain';
import { CreateMovimentRequestDTO } from '../dto';
import { randomUUID } from 'node:crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MovimentService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly dataSource: DataSource,
  ) {}

  async createMoviments(dto: CreateMovimentRequestDTO): Promise<Moviment> {
    const account = await this.accountRepository.findOne({
      where: {
        id: dto.accountId,
      },
    });

    if (!account) {
      throw new NotFoundException(
        'Account not found for moviment accountID provided',
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const movimentRepo = queryRunner.manager.getRepository(Moviment);

      const entity = movimentRepo.create(
        Moviment.build(
          randomUUID(),
          dto.accountId,
          account,
          dto.amount,
          dto.type as unknown as MovimentType,
          dto.description,
        ),
      );

      const saved = await movimentRepo.save(entity);

      await queryRunner.commitTransaction();
      return saved;
    } catch (e) {
      await queryRunner.rollbackTransaction();

      await queryRunner.release();

      throw e;
    }
  }
}
