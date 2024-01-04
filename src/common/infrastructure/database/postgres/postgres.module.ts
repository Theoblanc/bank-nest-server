import UserEntity from '@/user/infrastructure/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

export const entities = [UserEntity];

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
})
export class PostgresModule {}
