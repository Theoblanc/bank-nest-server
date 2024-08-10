import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountFactory } from '@/account/domain/account.factory';
import { AccountImplement } from '@/account/domain/account.model';

@Module({
  imports: [CqrsModule],
  providers: [AccountFactory, AccountImplement],
  exports: [AccountFactory, AccountImplement]
})
export class AccountDomainModule {}
