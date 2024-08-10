import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

@InputType()
export class AccountArgsDto {
  @Field(() => String, { description: '유저 아이디' })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @Field(() => Int, { description: '예금' })
  @IsNumber()
  balance: number;
}
