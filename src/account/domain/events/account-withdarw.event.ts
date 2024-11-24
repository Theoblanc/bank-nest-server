export class AccountWithdrawEvent {
  constructor(
    public readonly payload: {
      accountId: string;
      balance: number;
    }
  ) {}
}
