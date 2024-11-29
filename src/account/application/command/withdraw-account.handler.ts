import { CommandHandler } from '@nestjs/cqrs';
import { BadRequestException, Inject, Logger } from '@nestjs/common';
import { RepositoryToken } from '@common/infrastructure/repository-token';
import { IAccountRepository } from '@/account/domain/account.repository';
import { AccountFactory } from '@/account/domain/account.factory';
import { WithdrawAccountCommand } from '@/account/application/command/withdraw-accont.command';

@CommandHandler(WithdrawAccountCommand)
export class WithdrawAccountCommandHandler {
  private readonly logger: Logger;
  constructor(
    @Inject(RepositoryToken.ACCOUNT)
    private readonly accountRepository: IAccountRepository,
    private readonly factory: AccountFactory
  ) {
    this.logger = new Logger(WithdrawAccountCommandHandler.name);
  }

  async execute(command: WithdrawAccountCommand): Promise<void> {
    this.logger.log(`Async ${command.constructor.name}...`);

    const account = await this.accountRepository.findOne({
      where: { id: command.payload.accountId }
    });

    if (!account) {
      this.logger.error(
        `Account with ID ${command.payload.accountId} not found.`
      );
      throw new BadRequestException(`Account not found.`);
    }

    const accountProperties = account.properties();

    const accountFactory = this.factory.create({
      ...accountProperties
    });

    accountFactory.withdraw(command.payload.balance);

    // 4. 상태 저장
    account.commit();
  }
}
