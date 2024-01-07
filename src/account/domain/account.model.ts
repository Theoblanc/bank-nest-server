import { BaseModel } from '@/common/domain/base.model';
import { UserProperties } from '@/user/domain/user.model';
import { AggregateRoot } from '@nestjs/cqrs';

export interface Account {
  properties: () => AccountProperties;
  update: (account: Partial<AccountProperties>) => void;
}

export type AccountEssentialProperties = Required<{
  id: string;
  accountNumber: string;
  ownerName: string;
  balance: number;
}>;

export type AccountOptionalProperties = Partial<{
  user: UserProperties;
}>;

export type AccountProperties = BaseModel &
  AccountEssentialProperties &
  AccountOptionalProperties;

export class AccountImplement extends AggregateRoot implements Account {
  private readonly id: string;
  private readonly accountNumber: string;
  private readonly ownerName: string;
  private readonly balance: number;
  private readonly createdAt?: Date;
  private readonly updatedAt?: Date;
  private readonly deletedAt?: Date;
  private readonly user?: UserProperties;

  constructor(properties: AccountProperties) {
    super();
    Object.assign(this, properties);
  }

  properties(): AccountProperties {
    return {
      id: this.id,
      accountNumber: this.accountNumber,
      ownerName: this.ownerName,
      balance: this.balance,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      user: this.user,
    };
  }

  update(account: Partial<AccountProperties>): void {
    Object.assign(this, account);
  }
}
