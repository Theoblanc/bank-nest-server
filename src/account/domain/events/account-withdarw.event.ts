export class AccountWithdrawEvent {
  constructor(
    private readonly payload: {
      accountId: string;
      balance: number;
    }
  ) {
    Object.assign(this, payload);
  }
}
