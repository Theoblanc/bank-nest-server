import { Module } from '@nestjs/common';
import { AccountInfrastructureModule } from '@/account/infrastructure/account.infrastructure.module';

@Module({
  imports: [AccountInfrastructureModule]
})
export class AccountModule {}
