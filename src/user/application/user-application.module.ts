import { Module } from '@nestjs/common';
import { UserDTO } from './query/user.dto';
import { RegisterUserHandler } from './command/register-user.handler';
import { UserInfrastructureModule } from '@/user/infrastructure/user-infrastructure.module';
import { UserDomainModule } from '@/user/domain/user-domain.module';
import { GetMeHandler } from '@/user/application/query/get-me.handler';

const dtos = [UserDTO];

const handlers = [RegisterUserHandler, GetMeHandler];

@Module({
  imports: [UserDomainModule, UserInfrastructureModule],
  providers: [...dtos, ...handlers]
})
export class UserApplicationModule {}
