import { Module } from '@nestjs/common';
import { UserInfrastructureModule } from './infrastructure/user-infrastructure.module';
import { UserApplicationModule } from './application/user-application.module';
import { UserInterfacesModule } from './interfaces/user-interfaces.module';

@Module({
  imports: [
    UserApplicationModule,
    UserInterfacesModule,
    UserInfrastructureModule,
  ],
})
export class UserModule {}
