import { AccountProperties } from '@/account/domain/account.model';
import { BaseModel } from '@/common/domain/base.model';
import { AggregateRoot } from '@nestjs/cqrs';
import { UserRegisteredEvent } from '@/user/domain/user-register.event';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface User {
  commit: () => void;
  register: () => void;
  properties: () => UserProperties;
}

export type UserEssentialProperties = Required<{
  id: string;
  email: string;
  name: string;
  role: UserRole;
}>;

export type UserOptionalProperties = Partial<{
  password?: string;
  phone?: string;
  accounts?: AccountProperties[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}>;

export type UserProperties = BaseModel &
  UserEssentialProperties &
  UserOptionalProperties;

export class UserImplement extends AggregateRoot implements User {
  private readonly id: string;
  private readonly email: string;
  private readonly name: string;
  private readonly role: UserRole;
  private readonly password?: string;
  private readonly phone?: string;
  private readonly createdAt?: Date;
  private readonly updatedAt?: Date;
  private readonly deletedAt?: Date;
  private accounts?: AccountProperties[];

  constructor(properties: UserProperties) {
    super();
    Object.assign(this, properties);
  }

  register(): void {
    this.apply(new UserRegisteredEvent(this.properties()));
  }

  properties(): UserProperties {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      password: this.password,
      role: this.role,
      phone: this.phone,
      accounts: this.accounts,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    };
  }
}
