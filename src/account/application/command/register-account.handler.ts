import { CommandHandler } from '@nestjs/cqrs';
import { RegisterAccountCommand } from '@/account/application/command/register-account.command';
import { Inject, Logger, NotFoundException } from '@nestjs/common';
import { RepositoryToken } from '@common/infrastructure/repository-token';
import { AccountFactory } from '@/account/domain/account.factory';
import { IAccountRepository } from '@/account/domain/account.repository';
import { IUserRepository } from '@/user/domain/user.repository';

@CommandHandler(RegisterAccountCommand)
export class RegisterAccountHandler {
  private readonly logger: Logger;
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
    this.logger.log(`Async ${command.constructor.name}...`);

    const user = await this.userRepository.findOne({
      where: { id: command.payload.userId }
    });

    if (!user) {
      throw new NotFoundException(
        `User not found with id ${command.payload.userId}`
      );
    }

    const userProperties = user.properties();

    const account = this.factory.create({
      id: this.accountRepository.newId(),
      type: command.payload.accountType,
      ownerName: userProperties.name,
      accountNumber: '12345678911234',
      user: userProperties,
      balance: command.payload?.balance
    });

    await this.accountRepository.save(account, null);

    account.commit();
  }
}
