export class AccountDepositedEvent {
  constructor(
    public readonly payload: {
      accountId: string;
      balance: number;
    }
  ) {
    Object.assign(this, payload);
  }
}
