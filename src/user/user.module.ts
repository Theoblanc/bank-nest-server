import { Module } from '@nestjs/common';
import { UserInfrastructureModule } from './infrastructure/userInfrastructure.module';

@Module({
  imports: [UserInfrastructureModule],
})
export class UserModule {}
