import { Body, Injectable } from '@nestjs/common';
import { Account, Moviment, MovimentType } from '@/domain';
import { CreateMovimentRequestDTO } from '../dto';
import { randomUUID } from 'node:crypto';

@Injectable()
export class MovimentService {
  createMoviments(@Body() dto: CreateMovimentRequestDTO): Moviment {
    return Moviment.build(
      randomUUID(),
      dto.accountId,
      new Account(randomUUID(), 'name', 'document', 'email'),
      dto.amount,
      dto.type as unknown as MovimentType,
      dto.description,
    );
  }
}
