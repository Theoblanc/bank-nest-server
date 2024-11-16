import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AccountArgsDto } from '@/account/interfaces/dto/account.args.dto';
import { RegisterAccountCommand } from '@/account/application/command/register-account.command';
import { CommandBus } from '@nestjs/cqrs';
import { AccountDto } from '@/account/interfaces/dto/account.dto';
import { UpdatedAccountArgsDTO } from '@/account/interfaces/dto/updated-account.arg.dto';
import { DepositedAccountCommand } from '@/account/application/command/deposited-account.command';

@Resolver(() => AccountDto)
export class AccountResolver {
  constructor(private readonly commandBus: CommandBus) {}
  @Mutation(() => String, { nullable: true })
  async registerAccount(@Args('input') args: AccountArgsDto) {
    const { userId, balance, accountType } = args;
    const command = new RegisterAccountCommand({
      accountType,
      userId,
      balance
    });
    await this.commandBus.execute(command);
  }

  @Mutation(() => String, { nullable: true })
  async depositAccount(@Args('input') args: UpdatedAccountArgsDTO) {
    const { accountId, balance } = args;
    const command = new DepositedAccountCommand({
      accountId,
      balance
    });
    await this.commandBus.execute(command);
  }
}
