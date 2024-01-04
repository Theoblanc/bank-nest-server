import { BaseModel } from '@/common/domain/base.model';
import { AggregateRoot } from '@nestjs/cqrs';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface User {
  properties: () => UserProperties;
}

export type UserEssentialProperties = Required<{
  id: string;
  email: string;
  name: string;
  role: UserRole;
}>;

export type UserOptionalProperties = Partial<{
  password: string;
  phone: string;
}>;

export type UserProperties = BaseModel &
  UserEssentialProperties &
  UserOptionalProperties;

export class UserImplement extends AggregateRoot implements User {
  private readonly id: string;
  private readonly email: string;
  private readonly name: string;
  private readonly role: UserRole;
  private readonly password: string;
  private readonly phone: string;

  constructor(properties: UserProperties) {
    super();
    Object.assign(this, properties);
  }
  properties(): UserProperties {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      password: this.password,
      role: this.role,
      phone: this.phone,
    };
  }
}
