import { UserProperties, UserRole } from '@/user/domain/user.model';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

@ObjectType()
export class UserDTO implements UserProperties {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  phone?: string;

  @Field(() => UserRole)
  role: UserRole;

  @Field(() => Date)
  createdAt?: Date;

  @Field(() => Date)
  updatedAt?: Date;

  @Field(() => Date)
  deletedAt?: Date;
}
