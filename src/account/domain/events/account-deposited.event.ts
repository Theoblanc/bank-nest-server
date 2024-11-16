export interface IAccountDepositedEvent {
  accountId: string;
  balance: number;
}

export class AccountDepositedEvent {
  constructor(public readonly payload: IAccountDepositedEvent) {
    Object.assign(this, payload);
  }
}
