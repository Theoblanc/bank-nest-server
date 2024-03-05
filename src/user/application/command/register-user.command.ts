import { UserRole } from '@/user/domain/user.model';
import { ICommand } from '@nestjs/cqrs';
export interface IRegisterUserCommandPayload {
  readonly email: string;
  readonly name: string;
  readonly role: UserRole;
  readonly password?: string;
  readonly phone?: string;
}
export class RegisterUserCommand implements ICommand {
  constructor(readonly payload: IRegisterUserCommandPayload) {}
}
