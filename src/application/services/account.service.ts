import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account, Moviment } from '@/domain';
import {
  CreateAccountRequestDTO,
  CreateAccountResponseDTO,
  GetAccountBalanceResponseDTO,
} from '../dto';
import { randomUUID } from 'node:crypto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly dataSource: DataSource,
  ) {}

  async createAccount(
    dto: CreateAccountRequestDTO,
  ): Promise<CreateAccountResponseDTO> {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      const accountRepo = queryRunner.manager.getRepository(Account);

      const existing = await accountRepo.findOne({
        where: { document: dto.document },
      });

      if (existing) {
        return {
          accountId: existing.id,
        };
      }

      await queryRunner.connect();
      await queryRunner.startTransaction();

      const entity = accountRepo.create(
        Account.build(randomUUID(), dto.name, dto.document, dto.email),
      );

      const accountSaved = await accountRepo.save(entity);

      await queryRunner.commitTransaction();

      return {
        accountId: accountSaved.id,
      };
    } catch (e) {
      await queryRunner.rollbackTransaction();

      await queryRunner.release();

      throw e;
    }
  }

  async getAccountById(
    accountId: string,
  ): Promise<GetAccountBalanceResponseDTO> {
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
    });

    if (!account) {
      throw new NotFoundException(
        `Account not found with provided accountId:[${accountId}]`,
      );
    }
    const qr = this.dataSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();

    const movimentRepo = qr.manager.getRepository(Moviment);

    const { sum } = await movimentRepo
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

    return { accountId, balance, availableLimit };
  }
}
