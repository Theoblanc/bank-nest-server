import { CommandHandler } from '@nestjs/cqrs';
import { RegisterTransactionCommand } from '@/transaction/application/register-transaction.command';
import { Inject, Logger } from '@nestjs/common';
import { ITransactionRepository } from '@/transaction/domain/transaction.repository';
import { RepositoryToken } from '@common/infrastructure/repository-token';
import { TransactionFactory } from '@/transaction/domain/transaction.factory';
import { Transaction } from '@/transaction/domain/transaction.model';
import { TransactionStatus } from '@/transaction/infrastructure/transaction.entity';

@CommandHandler(RegisterTransactionCommand)
export class RegisterTransactionHandler {
  private readonly logger: Logger;
  constructor(
    @Inject(RepositoryToken.TRANSACTION)
    private readonly transactionRepository: ITransactionRepository,
    private readonly factory: TransactionFactory
  ) {}
  async execute(command: RegisterTransactionCommand): Promise<void> {
    this.logger.log(`Async ${command.constructor.name}`);

    const transaction: Transaction = this.factory.create({
      id: this.transactionRepository.newId(),
      status: TransactionStatus.REQUESTED,
      ...command.payload
    });

    transaction.processTransaction();
    await this.transactionRepository.save(transaction);
    transaction.commit();
  }
}
