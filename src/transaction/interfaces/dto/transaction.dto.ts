import { Field, ObjectType } from '@nestjs/graphql';
import { TransactionType } from '@/transaction/infrastructure/transaction.entity';

@ObjectType()
export class TransactionDto {
  @Field()
  id: string;

  @Field(() => TransactionType)
  transactionType: TransactionType;

  @Field()
  fromAccountId: string;

  @Field()
  toAccountId: string;

  @Field()
  amount: number;

  @Field({ nullable: true })
  description?: string;

  @Field()
  createdAt: Date;
}
