import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { AccountProperties } from '@/account/domain/account.model';

@InputType()
export class AccountDto implements AccountProperties {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  ownerName: string;

  @Field(() => String)
  accountNumber: string;

  @Field(() => Int)
  balance: number;
}
