import { Money } from '@common/domain/value-objects/money.vo';

export class AccountDepositedEvent {
  constructor(
    public readonly accountId: string,
    public readonly amount: Money, // Money VO 사용
    public readonly balance: Money,
    public readonly occurredAt: Date
  ) {}
}
