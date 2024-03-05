import { CommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from './register-user.command';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler {}
