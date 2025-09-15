export class Account {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly document: string,
    public readonly email: string,
    public readonly creditLimit: number,
  ) {}

  static build(
    id: string,
    name: string,
    document: string,
    email: string,
    creditLimit?: number,
  ): Account {
    return new Account(id, name, document, email, creditLimit ?? 1000);
  }
}
