import { Module } from '@nestjs/common';
import { UserDTO } from './query/user.dto';
import { RegisterUserHandler } from './command/register-user.handler';

const dtos = [UserDTO];

const handlers = [RegisterUserHandler];

@Module({
  imports: [],
  providers: [...dtos, ...handlers],
})
export class UserApplicationModule {}
