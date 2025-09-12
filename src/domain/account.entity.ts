export class Account {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly document: string,
    public readonly email: string,
  ) {}

  static build(
    id: string,
    name: string,
    document: string,
    email: string,
  ): Account {
    return new Account(id, name, document, email);
  }
}
