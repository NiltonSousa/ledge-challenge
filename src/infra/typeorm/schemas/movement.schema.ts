import { EntitySchema } from 'typeorm';
import { Movement } from '@/domain';

export const MovementSchema = new EntitySchema<Movement>({
  name: 'Movement',
  target: Movement,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    accountId: {
      type: 'uuid',
      name: 'account_id',
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
      joinColumn: { name: 'account_id' },
      inverseSide: 'movements',
      onDelete: 'CASCADE',
    },
  },
});
