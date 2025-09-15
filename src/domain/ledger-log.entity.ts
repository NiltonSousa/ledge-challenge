export type LedgerLogStatus = 'PROCESSED';

export class LedgerLog {
  constructor(
    public readonly id: string,
    public readonly payload: string,
    public readonly status: LedgerLogStatus,
  ) {}

  static build(
    id: string,
    payload: string,
    status: LedgerLogStatus,
  ): LedgerLog {
    return new LedgerLog(id, payload, status);
  }
}
