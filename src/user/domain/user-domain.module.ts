import { Module, Provider } from '@nestjs/common';
import { UserImplement } from './user.model';
import { UserFactory } from '@/user/domain/user.factory';
import { CqrsModule } from '@nestjs/cqrs';

const providers: Provider[] = [UserFactory, UserImplement];

@Module({
  imports: [CqrsModule],
  providers: providers,
  exports: providers
})
export class UserDomainModule {}
