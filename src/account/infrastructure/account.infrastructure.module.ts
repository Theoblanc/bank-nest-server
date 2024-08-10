import { TypeOrmModule } from '@nestjs/typeorm';
import AccountEntity from '@/account/infrastructure/account.entity';
import { Module, Provider } from '@nestjs/common';
import { RepositoryToken } from '@common/infrastructure/repository-token';
import { AccountTypeORM } from '@/account/infrastructure/account.typeORM';

export const AccountRepositoryImpl: Provider = {
  provide: RepositoryToken.ACCOUNT,
  useClass: AccountTypeORM
};

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  providers: [AccountRepositoryImpl],
  exports: [AccountRepositoryImpl]
})
export class AccountInfrastructureModule {}
