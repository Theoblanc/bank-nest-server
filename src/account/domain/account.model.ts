import { BaseModel } from '@/common/domain/base.model';
import { UserProperties } from '@/user/domain/user.model';
import { AggregateRoot } from '@nestjs/cqrs';

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
  private balance: number;
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
      balance: this.balance,
      user: this.user,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    };
  }

  getBalance(): number {
    return this.balance;
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error('Deposit amount must be greater than zero.');
    }
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= 0) {
      throw new Error('Withdrawal amount must be greater than zero.');
    }
    if (this.balance < amount) {
      throw new Error('Insufficient funds.');
    }
    this.balance -= amount;
  }
}
