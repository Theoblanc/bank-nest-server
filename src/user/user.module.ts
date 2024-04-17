import { Module } from '@nestjs/common';
import { UserInfrastructureModule } from './infrastructure/user-infrastructure.module';
import { UserApplicationModule } from './application/user-application.module';
import { UserInterfacesModule } from './interfaces/user-interfaces.module';
import { UserDomainModule } from '@/user/domain/user-domain.module';

@Module({
  imports: [
    UserDomainModule,
    UserApplicationModule,
    UserInterfacesModule,
    UserInfrastructureModule
  ],
  exports: [
    UserDomainModule,
    UserApplicationModule,
    UserInterfacesModule,
    UserInfrastructureModule
  ]
})
export class UserModule {}
