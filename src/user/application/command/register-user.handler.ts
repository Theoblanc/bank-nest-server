import { CommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from './register-user.command';
import { IUserRepository } from '@/user/domain/user.repository';
import { Inject } from '@nestjs/common';
import { RepositoryToken } from '@common/infrastructure/repository-token';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler {
  constructor(
    @Inject(RepositoryToken.USER)
    private repository: IUserRepository
  ) {}
}
