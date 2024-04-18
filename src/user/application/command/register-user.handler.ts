import { CommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from './register-user.command';
import { IUserRepository } from '@/user/domain/user.repository';
import { Inject } from '@nestjs/common';
import { RepositoryToken } from '@common/infrastructure/repository-token';
import { UserFactory } from '@/user/domain/user.factory';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler {
  constructor(
    @Inject(RepositoryToken.USER)
    private repository: IUserRepository,
    private readonly factory: UserFactory
  ) {}

  async execute(command: RegisterUserCommand): Promise<void> {
    // this.repository.save({ id: this.repository.newId(), ...command.payload });
    const user = this.factory.create({
      id: this.repository.newId(),
      ...command.payload
    });

    user.register();

    console.log(user);
  }
}
