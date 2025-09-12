export type MovimentType = 'CREDIT' | 'DEBIT';

export class Moviment {
  constructor(
    public readonly id: string,
    public readonly accountId: string,
    public readonly amount: number,
    public readonly type: MovimentType,
    public readonly description: string,
  ) {}

  static build(
    id: string,
    accountId: string,
    amount: number,
    type: MovimentType,
    description: string,
  ): Moviment {
    return new Moviment(id, accountId, amount, type, description);
  }

  approveDebitMoviment(balanceLimitAmount: number): boolean {
    if (this.type === 'DEBIT') {
      return balanceLimitAmount >= this.amount;
    }

    return true;
  }
}
