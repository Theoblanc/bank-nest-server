import {
  BadRequestException,
  Inject,
  InternalServerErrorException,
  Logger
} from '@nestjs/common';
import { TransferRequestedCommand } from '@/account/application/command/transfer-requested.command';
import { DataSource } from 'typeorm';
import { AccountFactory } from '@/account/domain/account.factory';
import { IAccountRepository } from '@/account/domain/account.repository';
import { RepositoryToken } from '@common/infrastructure/repository-token';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(TransferRequestedCommand)
export class TransferRequestedCommandHandler
  implements ICommandHandler<TransferRequestedCommand>
{
  private readonly logger: Logger;

  constructor(
    @Inject(RepositoryToken.ACCOUNT)
    private readonly accountRepository: IAccountRepository,
    private readonly factory: AccountFactory,
    private readonly dataSource: DataSource
  ) {
    this.logger = new Logger(TransferRequestedCommandHandler.name);
  }

  async execute(command: TransferRequestedCommand): Promise<void> {
    const { fromAccountId, toAccountId, amount } = command.payload;

    if (fromAccountId === toAccountId) {
      throw new BadRequestException('Cannot transfer to the same account');
    }

    this.logger.log(
      `Starting transfer: ${fromAccountId} -> ${toAccountId}, Amount: ${amount}`
    );

    await this.dataSource
      .transaction(async (transactionalEntityManager) => {
        const fromAccount = await this.accountRepository.findOneAndLock(
          transactionalEntityManager,
          { where: { id: fromAccountId } }
        );

        if (!fromAccount) {
          throw new BadRequestException(
            `Sender account ${fromAccountId} not found.`
          );
        }

        const toAccount = await this.accountRepository.findOneAndLock(
          transactionalEntityManager,
          { where: { id: toAccountId } }
        );

        if (!toAccount) {
          throw new BadRequestException(
            `Receiver account ${toAccountId} not found.`
          );
        }

        const senderAccount = this.factory.create(fromAccount.properties());
        const receiverAccount = this.factory.create(toAccount.properties());

        senderAccount.withdraw(amount);
        receiverAccount.deposit(amount);

        senderAccount.commit();
        receiverAccount.commit();

        await this.accountRepository.save(
          senderAccount,
          transactionalEntityManager
        );
        await this.accountRepository.save(
          receiverAccount,
          transactionalEntityManager
        );

        this.logger.log(
          `Transfer completed: ${fromAccountId} -> ${toAccountId}, Amount: ${amount}`
        );
      })
      .catch((error) => {
        this.logger.error(
          `Transfer failed: ${fromAccountId} -> ${toAccountId}, Amount: ${amount}`,
          error.stack
        );

        if (error instanceof BadRequestException) {
          throw error;
        }

        throw new InternalServerErrorException(
          'An error occurred while processing the transfer'
        );
      });
  }
}
