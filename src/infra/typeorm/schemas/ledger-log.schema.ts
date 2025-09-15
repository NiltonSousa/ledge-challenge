import { LedgerLog } from '@/domain/ledger-log.entity';
import { EntitySchema } from 'typeorm';

export const LedgerLogSchema = new EntitySchema<LedgerLog>({
  name: 'LedgerLog',
  target: LedgerLog,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: true,
    },
    payload: {
      type: 'jsonb',
    },
    status: {
      type: String,
    },
  },
});
