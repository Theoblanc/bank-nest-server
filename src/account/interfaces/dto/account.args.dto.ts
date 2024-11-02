import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { AccountType } from '@/account/domain/account.model';

@InputType()
export class AccountArgsDto {
  @Field(() => AccountType, { description: '개인 or 법인' })
  @IsEnum(AccountType)
  accountType: AccountType;

  @Field(() => String, { description: '유저 아이디' })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @Field(() => Int, { description: '예금' })
  @IsNumber()
  balance: number;
}
