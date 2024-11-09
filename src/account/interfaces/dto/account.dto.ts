import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { AccountProperties, AccountType } from '@/account/domain/account.model';
import { IsNotEmpty } from 'class-validator';
import { UserProperties } from '@/user/domain/user.model';
import { registerEnumType } from '@nestjs/graphql';

registerEnumType(AccountType, {
  name: 'AccountType',
  description: '계좌 유형'
});

@InputType()
export class AccountDto implements AccountProperties {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field(() => AccountType)
  @IsNotEmpty()
  type: AccountType;

  @Field(() => String)
  @IsNotEmpty()
  ownerName: string;

  @Field(() => String)
  @IsNotEmpty()
  user: UserProperties;

  @Field(() => String)
  @IsNotEmpty()
  accountNumber: string;

  @Field(() => Int)
  @IsNotEmpty()
  balance: number;
}
