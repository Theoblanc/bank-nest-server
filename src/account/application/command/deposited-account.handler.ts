import { CommandHandler } from '@nestjs/cqrs';
import { DepositedAccountCommand } from '@/account/application/command/deposited-account.command';
import { Inject, Logger } from '@nestjs/common';
import { RepositoryToken } from '@common/infrastructure/repository-token';
import { IAccountRepository } from '@/account/domain/account.repository';
import { AccountFactory } from '@/account/domain/account.factory';

@CommandHandler(DepositedAccountCommand)
export class DepositedAccountCommandHandler {
  private readonly logger: Logger;
  constructor(
    @Inject(RepositoryToken.ACCOUNT)
    private readonly accountRepository: IAccountRepository,
    private readonly factory: AccountFactory
  ) {
    this.logger = new Logger(DepositedAccountCommandHandler.name);
  }

  async execute(command: DepositedAccountCommand): Promise<void> {
    this.logger.log(`Async ${command.constructor.name}...`);

    const account = await this.accountRepository.findOne({
      where: { id: command.payload.accountId }
    });

    const accountProperties = account.properties();

    const accountFactory = this.factory.create({
      ...accountProperties
    });

    accountFactory.deposit(command.payload.balance);
    account.commit();
  }
}
