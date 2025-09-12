import { EntitySchema } from 'typeorm';
import { Moviment } from '@/domain';

export const MovimentSchema = new EntitySchema<Moviment>({
  name: 'Moviment',
  target: Moviment,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    accountId: {
      type: String,
    },
    amount: {
      type: Number,
    },
    type: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  relations: {
    account: {
      type: 'many-to-one',
      target: 'Account',
      joinColumn: { name: 'accountId' },
      inverseSide: 'moviments',
      onDelete: 'CASCADE',
    },
  },
});
