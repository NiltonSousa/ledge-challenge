import { Body, Injectable } from '@nestjs/common';
import { Moviment, MovimentType } from 'src/domain';
import { CreateMovimentRequestDTO } from '../dto';
import { randomUUID } from 'node:crypto';

@Injectable()
export class MovimentService {
  createMoviments(@Body() dto: CreateMovimentRequestDTO): Moviment {
    return Moviment.build(
      randomUUID(),
      dto.accountId,
      dto.amount,
      dto.type as unknown as MovimentType,
      dto.description,
    );
  }
}
