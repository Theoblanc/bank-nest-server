import { Module } from '@nestjs/common';
import { UserImplement } from './user.model';

@Module({
  imports: [],
  providers: [UserImplement],
})
export class UserDomainModule {}
