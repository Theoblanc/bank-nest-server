import { Module, Provider } from '@nestjs/common';
import { UserResolver } from '@/user/interfaces/user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from '@/user/infrastructure/user.entity';
import { RepositoryToken } from '@common/infrastructure/repository-token';
import { UserTypeORM } from '@/user/infrastructure/user.typeORM';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterUserHandler } from '@/user/application/command/register-user.handler';
import { GetMeHandler } from '@/user/application/query/get-me.handler';

export const UserRepositoryImpl: Provider = {
  provide: RepositoryToken.USER,
  useClass: UserTypeORM
};

const resolver = [UserResolver];
const handler = [RegisterUserHandler, GetMeHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [...resolver, ...handler, UserRepositoryImpl],
  exports: [UserRepositoryImpl]
})
export class UserModule {}
