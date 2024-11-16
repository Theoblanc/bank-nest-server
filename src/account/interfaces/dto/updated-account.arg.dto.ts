import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdatedAccountArgsDTO {
  @Field(() => String, { description: '계좌 아이디' })
  @IsNotEmpty()
  @IsString()
  accountId: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  balance: number;
}
