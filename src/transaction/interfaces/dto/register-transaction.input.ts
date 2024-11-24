import { Field, InputType } from '@nestjs/graphql';
import { TransactionType } from '@/transaction/infrastructure/transaction.entity';

@InputType()
export class RegisterTransactionInput {
  @Field(() => TransactionType)
  transactionType: TransactionType;

  @Field({ nullable: true })
  fromAccountId?: string;

  @Field({ nullable: true })
  toAccountId?: string;

  @Field()
  amount: number;

  @Field({ nullable: true })
  description?: string;
}
