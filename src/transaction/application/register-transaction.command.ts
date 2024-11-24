export class RegisterTransactionCommand {
  constructor(
    private readonly payload: {
      accountId: string;
    }
  ) {}
}
