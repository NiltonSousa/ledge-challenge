import { Account } from './account.entity';

export type MovementType = 'CREDIT' | 'DEBIT';

export class Movement {
  constructor(
    public readonly id: string,
    public readonly accountId: string,
    public readonly account: Account,
    public readonly amount: number,
    public readonly type: MovementType,
    public readonly description: string,
  ) {}

  static build(
    id: string,
    accountId: string,
    account: Account,
    amount: number,
    type: MovementType,
    description: string,
  ): Movement {
    return new Movement(id, accountId, account, amount, type, description);
  }
}
