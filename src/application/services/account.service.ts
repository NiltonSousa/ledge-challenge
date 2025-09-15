import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '@/domain';
import { CreateAccountRequestDTO } from '../dto';
import { randomUUID } from 'node:crypto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly dataSource: DataSource,
  ) {}

  async createAccount(dto: CreateAccountRequestDTO): Promise<Account> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const accountRepo = queryRunner.manager.getRepository(Account);

      const existing = await accountRepo.findOne({
        where: { document: dto.document },
      });

      if (existing) {
        await queryRunner.commitTransaction();
        return existing;
      }

      const entity = accountRepo.create(
        Account.build(randomUUID(), dto.name, dto.document, dto.email),
      );

      const saved = await accountRepo.save(entity);

      await queryRunner.commitTransaction();
      return saved;
    } catch (e) {
      await queryRunner.rollbackTransaction();

      await queryRunner.release();

      throw e;
    }
  }

  async getAccountById(accountId: string): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
    });
    if (!account) {
      throw new NotFoundException(
        `Account not found with provided accountId:[${accountId}]`,
      );
    }
    return account;
  }
}
