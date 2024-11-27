import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  TransactionStatus,
  TransactionType
} from '@/transaction/infrastructure/transaction.entity';
import { TransactionProperties } from '@/transaction/domain/transaction.model';
import { IsNotEmpty, IsOptional } from 'class-validator';

registerEnumType(TransactionType, {
  name: 'TransactionType',
  description: '이체 유형'
});

registerEnumType(TransactionStatus, {
  name: 'TransactionStatus',
  description: '거래 상태 유형'
});

@ObjectType()
export class TransactionDto implements TransactionProperties {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field(() => TransactionStatus)
  @IsNotEmpty()
  status: TransactionStatus;

  @Field(() => TransactionType)
  @IsNotEmpty()
  transactionType: TransactionType;

  @Field()
  @IsNotEmpty()
  fromAccountId: string;

  @Field()
  @IsNotEmpty()
  toAccountId: string;

  @Field()
  @IsNotEmpty()
  amount: number;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field()
  @IsNotEmpty()
  createdAt: Date;
}
