import { CommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from './register-user.command';
import { IUserRepository } from '@/user/domain/user.repository';
import { Inject, Logger } from '@nestjs/common';
import { RepositoryToken } from '@common/infrastructure/repository-token';
import { UserFactory } from '@/user/domain/user.factory';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler {
  readonly logger: Logger;
  constructor(
    @Inject(RepositoryToken.USER)
    private userRepository: IUserRepository,
    private readonly factory: UserFactory
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  async execute(command: RegisterUserCommand): Promise<void> {
    this.logger.log(`Async ${command.constructor.name}...`);

    const savedUser = await this.userRepository.findByEmail(
      command.payload.email
    );

    if (savedUser) {
      throw new Error('User already exists');
    }

    const user = this.factory.create({
      id: this.userRepository.newId(),
      ...command.payload
    });

    user.register();

    this.userRepository.save(user);
  }
}
