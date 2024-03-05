import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import UserEntity from '../infrastructure/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

const resolvers = [UserResolver];
@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [...resolvers],
})
export class UserInterfacesModule {}
