import { Body, Injectable } from '@nestjs/common';
import { Account } from '@/domain';
import { CreateAccountRequestDTO } from '../dto';
import { randomUUID } from 'node:crypto';

@Injectable()
export class AccountService {
  createAccounts(@Body() dto: CreateAccountRequestDTO): Account {
    return Account.build(randomUUID(), dto.name, dto.document, dto.email);
  }

  getAccountById(accountId: string): Account {
    return Account.build(accountId, 'name', 'document', 'email');
  }
}
