import { Account } from './account.entity';

export type MovimentType = 'CREDIT' | 'DEBIT';

export class Moviment {
  constructor(
    public readonly id: string,
    public readonly accountId: string,
    public readonly account: Account,
    public readonly amount: number,
    public readonly type: MovimentType,
    public readonly description: string,
  ) {}

  static build(
    id: string,
    accountId: string,
    account: Account,
    amount: number,
    type: MovimentType,
    description: string,
  ): Moviment {
    return new Moviment(id, accountId, account, amount, type, description);
  }

  approveDebitMoviment(balanceLimitAmount: number): boolean {
    if (this.type === 'DEBIT') {
      return balanceLimitAmount >= this.amount;
    }

    return true;
  }
}
