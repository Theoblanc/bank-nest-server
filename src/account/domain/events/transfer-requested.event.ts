export class TransferRequestedEvent {
  constructor(
    public readonly payload: {
      fromAccountId: string;
      toAccountId: string;
      amount: number;
      description?: string;
    }
  ) {}
}
