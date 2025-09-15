import { EntitySchema } from 'typeorm';
import { Account } from '@/domain';

export const AccountSchema = new EntitySchema<Account>({
  name: 'Account',
  target: Account,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: true,
    },
    name: {
      type: String,
    },
    document: {
      type: String,
    },
    email: {
      type: String,
    },
    creditLimit: {
      type: Number,
      name: 'credit_limit',
    },
  },
});
