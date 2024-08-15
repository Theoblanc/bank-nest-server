import { CommandHandler } from '@nestjs/cqrs';
import { RegisterAccountCommand } from '@/account/application/command/register-account.command';
import { Inject, Logger } from '@nestjs/common';
import { RepositoryToken } from '@common/infrastructure/repository-token';
import { AccountFactory } from '@/account/domain/account.factory';
import { IAccountRepository } from '@/account/domain/account.repository';
import { IUserRepository } from '@/user/domain/user.repository';

@CommandHandler(RegisterAccountCommand)
export class RegisterAccountCommandHandler {
  readonly logger;
  constructor(
    @Inject(RepositoryToken.ACCOUNT)
    private readonly accountRepository: IAccountRepository,
    @Inject(RepositoryToken.USER)
    private userRepository: IUserRepository,
    private readonly factory: AccountFactory
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  async execute(command: RegisterAccountCommand): Promise<void> {
    this.logger.error(`Async ${command.constructor.name}...`);

    const user = await this.userRepository.findOne({
      where: { id: command.payload.userId }
    });
    const account = this.factory.create({
      id: this.accountRepository.newId(),
      ownerName: user.name,
      accountNumber: '12345678911234',
      balance: command.payload?.balance
    });

    account.console.log(account);
  }
}
