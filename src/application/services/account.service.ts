import { Body, Injectable } from '@nestjs/common';
import { Account } from 'src/domain';
import { CreateAccountRequestDTO } from '../dto';
import { randomUUID } from 'node:crypto';

@Injectable()
export class AccountService {
  createAccounts(@Body() dto: CreateAccountRequestDTO): Account {
    return Account.build(randomUUID(), dto.name, dto.document, dto.email);
  }
}
