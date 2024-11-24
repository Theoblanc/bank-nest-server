import { BaseModel } from '@common/domain/base.model';
import { AggregateRoot } from '@nestjs/cqrs';
import { TransactionType } from '@/transaction/infrastructure/transaction.entity';
import { AccountProperties } from '@/account/domain/account.model';

export interface Transaction {
  commit: () => void;
  properties: () => TransactionProperties;
}

export type TransactionEssentialProperties = Required<{
  id: string;
  transactionType: TransactionType;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
}>;

export type TransactionOptionalProperties = Partial<{
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
  private readonly fromAccount?: AccountProperties;
  private readonly fromAccountId: string;
  private readonly toAccount?: AccountProperties;
  private readonly toAccountId: string;
  private readonly amount: number;
  private readonly description?: string | null;
  private readonly createdAt?: Date;
  private readonly updatedAt?: Date;
  private readonly deletedAt?: Date;

  constructor(properties: TransactionProperties) {
    super();
    Object.assign(this, properties);
  }

  properties(): TransactionProperties {
    return {
      id: this.id,
      transactionType: this.transactionType,
      fromAccountId: this.fromAccountId,
      toAccountId: this.toAccountId,
      fromAccount: this.fromAccount,
      toAccount: this.toAccount,
      amount: this.amount,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    };
  }
}
