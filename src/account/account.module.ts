import { Module, Provider } from '@nestjs/common';
import { UserModule } from '@/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import AccountEntity from '@/account/infrastructure/account.entity';
import { RepositoryToken } from '@common/infrastructure/repository-token';
import { AccountTypeORM } from '@/account/infrastructure/account.typeORM';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountFactory } from '@/account/domain/account.factory';
import { AccountResolver } from '@/account/interfaces/account.resolver';
import { RegisterAccountCommandHandler } from '@/account/application/command/register-command.handler';

export const AccountRepositoryImpl: Provider = {
  provide: RepositoryToken.ACCOUNT,
  useClass: AccountTypeORM
};

const handler = [RegisterAccountCommandHandler];

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity]), CqrsModule, UserModule],
  providers: [
    AccountRepositoryImpl,
    AccountFactory,
    AccountResolver,
    ...handler
  ],
  exports: [AccountRepositoryImpl, AccountFactory]
})
export class AccountModule {}
