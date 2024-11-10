export enum Currency {
  KRW = 'KRW',
  USD = 'USD'
}

export class Money {
  constructor(
    public readonly amount: number,
    private readonly currency: Currency = Currency.KRW
  ) {}

  static of(amount: number): Money {
    return new Money(amount);
  }

  static won(amount: number): Money {
    return new Money(amount, Currency.KRW);
  }

  static dollar(amount: number): Money {
    return new Money(amount, Currency.USD);
  }

  static readonly ZERO = new Money(0);

  private validate(amount: number): void {
    if (!Number.isFinite(amount)) {
      throw new Error('Amount must be a number');
    }
    if (amount < 0) {
      throw new Error('Amount cannot be negative');
    }
    if (!Number.isInteger(amount * 100)) {
      throw new Error('Amount cannot have more than 2 decimal places');
    }
  }

  private validateSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new Error('Cannot operate on money with different currencies');
    }
  }

  add(other: Money): Money {
    this.validateSameCurrency(other);
    return new Money(this.amount + other.amount, this.currency);
  }
  subtract(other: Money): Money {
    this.validateSameCurrency(other);
    return new Money(this.amount - other.amount, this.currency);
  }

  toNumber(): number {
    return this.amount;
  }
}
