import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RegisterTransactionInput } from '@/transaction/interfaces/dto/register-transaction.input';
import { TransactionDto } from '@/transaction/interfaces/dto/transaction.dto';
import { RegisterTransactionCommand } from '@/transaction/application/register-transaction.command';

@Resolver()
export class TransactionResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => TransactionDto)
  async createTransaction(
    @Args('input') input: RegisterTransactionInput
  ): Promise<TransactionDto> {
    const command = new RegisterTransactionCommand({
      transactionType: input.transactionType,
      fromAccountId: input.fromAccountId,
      toAccountId: input.toAccountId,
      amount: input.amount,
      description: input.description
    });

    return this.commandBus.execute(command);
  }
}
