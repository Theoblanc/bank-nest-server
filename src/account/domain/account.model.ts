import { BaseModel } from '@/common/domain/base.model';
import { UserProperties } from '@/user/domain/user.model';
import { AggregateRoot } from '@nestjs/cqrs';
import { Money } from '@common/domain/value-objects/money.vo';
import { AccountDepositedEvent } from '@/account/domain/events/account-deposited.event';
import { AccountWithdrawEvent } from '@/account/domain/events/account-withdarw.event';

export enum AccountType {
  BUSINESS = 'BUSINESS',
  PERSONAL = 'PERSONAL'
}

export interface Account {
  properties: () => AccountProperties;
  getBalance: () => number;
  deposit: (amount: number) => void;
  withdraw: (amount: number) => void;
  commit: () => void;
}

export type AccountEssentialProperties = Required<{
  id: string;
  type: AccountType;
  accountNumber: string;
  ownerName: string;
  balance: number;
  user: UserProperties;
}>;

export type AccountProperties = BaseModel & AccountEssentialProperties;

export class AccountImplement extends AggregateRoot implements Account {
  private readonly id: string;
  private readonly type: AccountType;
  private readonly accountNumber: string;
  private readonly ownerName: string;
  private balance: Money;
  private readonly createdAt?: Date;
  private readonly updatedAt?: Date;
  private readonly deletedAt?: Date;
  private user: UserProperties;

  constructor(properties: AccountProperties) {
    super();
    Object.assign(this, properties);
  }

  get accountId() {
    return this.id;
  }

  properties(): AccountProperties {
    return {
      id: this.id,
      type: this.type,
      accountNumber: this.accountNumber,
      ownerName: this.ownerName,
      balance: this.balance.toNumber(),
      user: this.user,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    };
  }

  getBalance(): number {
    return this.balance.toNumber();
  }

  deposit(amount: number): void {
    const depositAmount = new Money(amount);
    this.balance = this.balance.add(depositAmount);
    this.apply(
      new AccountDepositedEvent({
        accountId: this.id,
        balance: this.balance.toNumber()
      })
    );
  }

  withdraw(amount: number): void {
    const withdrawAmount = new Money(amount);
    this.balance = this.balance.subtract(withdrawAmount);
    this.apply(
      new AccountWithdrawEvent({
        accountId: this.id,
        balance: this.balance.toNumber()
      })
    );
  }
}
