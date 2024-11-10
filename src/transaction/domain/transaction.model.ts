import { BaseModel } from '@common/domain/base.model';
import { AggregateRoot } from '@nestjs/cqrs';

export interface Transaction {
  commit: () => void;
  properties: () => TransactionProperties;
}

export type TransactionEssentialProperties = Required<{ id: string }>;

export type TransactionOptionalProperties = Partial<{
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}>;

export type TransactionProperties = BaseModel &
  TransactionEssentialProperties &
  TransactionOptionalProperties;

export class TransactionImplement extends AggregateRoot implements Transaction {
  private readonly id: string;
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
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    };
  }
}
