import { BaseModel } from '@common/domain/base.model';
import { AggregateRoot } from '@nestjs/cqrs';
import {
  TransactionStatus,
  TransactionType
} from '@/transaction/infrastructure/transaction.entity';
import { AccountProperties } from '@/account/domain/account.model';
import { Money } from '@common/domain/value-objects/money.vo';

export interface Transaction {
  commit: () => void;
  properties: () => TransactionProperties;
  processTransaction: () => void;
}

export type TransactionEssentialProperties = Required<{
  id: string;
  transactionType: TransactionType;
  amount: number;
}>;

export type TransactionOptionalProperties = Partial<{
  status?: TransactionStatus;
  fromAccountId?: string;
  toAccountId?: string;
  toAccount?: AccountProperties;
  fromAccount?: AccountProperties;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}>;

export type TransactionProperties = BaseModel &
  TransactionEssentialProperties &
  TransactionOptionalProperties;

export class TransactionImplement extends AggregateRoot implements Transaction {
  private readonly id: string;
  private readonly transactionType: TransactionType;
  private readonly status: TransactionStatus = TransactionStatus.REQUESTED;
  private readonly fromAccount?: AccountProperties;
  private readonly fromAccountId?: string;
  private readonly toAccount?: AccountProperties;
  private readonly toAccountId?: string;
  private readonly amount: Money;
  private readonly description?: string | null;
  private readonly createdAt?: Date;
  private readonly updatedAt?: Date;
  private readonly deletedAt?: Date;

  constructor(properties: TransactionProperties) {
    super();
    Object.assign(this, properties);
  }

  processTransaction(): void {
    switch (this.transactionType) {
      case TransactionType.TRANSFER:
        this.validateTransfer();
        this.transfer();
        break;

      case TransactionType.DEPOSIT:
        this.validateDeposit();
        this.deposit();

        break;

      case TransactionType.WITHDRAWAL:
        this.validateWithdrawal();
        this.withdrawal();
        break;

      default:
        throw new Error(
          `지원하지 않는 거래 유형입니다: ${this.transactionType}`
        );
    }
  }

  private validateTransfer(): void {
    if (!this.fromAccountId || !this.toAccountId) {
      throw new Error('이체 거래는 출금계좌와 입금계좌가 모두 필요합니다');
    }
    if (this.fromAccountId === this.toAccountId) {
      throw new Error('동일 계좌로는 이체할 수 없습니다');
    }
  }

  private validateDeposit(): void {
    if (!this.toAccountId) {
      throw new Error('입금 거래는 입금계좌가 필요합니다');
    }
  }

  private validateWithdrawal(): void {
    if (!this.fromAccountId) {
      throw new Error('출금 거래는 출금계좌가 필요합니다');
    }
  }

  private transfer(): void {
    return this.apply(
      new TransferRequestedEvent({
        fromAccountId: this.fromAccountId,
        toAccountId: this.toAccountId,
        amount: this.amount
      })
    );
  }

  private deposit(): void {
    return this.apply(
      new AccountDepositRequestedEvent({
        accountId: this.toAccountId,
        amount: this.amount
      })
    );
  }

  private withdrawal(): void {
    return this.apply(
      new AccountWithdrawRequestedEvent({
        accountId: this.fromAccountId,
        amount: this.amount
      })
    );
  }

  properties(): TransactionProperties {
    return {
      id: this.id,
      status: this.status,
      transactionType: this.transactionType,
      fromAccountId: this.fromAccountId,
      toAccountId: this.toAccountId,
      fromAccount: this.fromAccount,
      toAccount: this.toAccount,
      amount: this.amount.toNumber(),
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    };
  }
}
