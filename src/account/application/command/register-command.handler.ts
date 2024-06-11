import { CommandHandler } from '@nestjs/cqrs';
import { RegisterAccountCommand } from '@/account/application/command/register-account.command';
import { Inject, Logger } from '@nestjs/common';
import { RepositoryToken } from '@common/infrastructure/repository-token';
import { AccountFactory } from '@/account/domain/account.factory';
import { IAccountRepository } from '@/account/domain/account.repository';

@CommandHandler(RegisterAccountCommand)
export class RegisterAccountCommandHandler {
  readonly logger;
  constructor(
    @Inject(RepositoryToken.ACCOUNT)
    private readonly accountRepository: IAccountRepository,
    private readonly factory: AccountFactory
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  async execute(command: RegisterAccountCommand): Promise<void> {
    this.logger.log(`Async ${command.constructor.name}...`);
  }
}
