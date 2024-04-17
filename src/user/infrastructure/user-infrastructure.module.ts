import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from './user.entity';
import { RepositoryToken } from '@common/infrastructure/repository-token';
import { UserTypeORM } from '@/user/infrastructure/user.typeORM';
import { UserDomainModule } from '@/user/domain/user-domain.module';

export const UserRepositoryImpl: Provider = {
  provide: RepositoryToken.USER,
  useClass: UserTypeORM
};

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), UserDomainModule],
  providers: [UserRepositoryImpl],
  exports: [UserRepositoryImpl]
})
export class UserInfrastructureModule {}
