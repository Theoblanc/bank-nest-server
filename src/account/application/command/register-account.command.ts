import { ICommand } from '@nestjs/cqrs';

export interface IRegisterAccountCommandPayload {
  readonly userId?: string;
  readonly balance?: number;
}

export class RegisterAccountCommand implements ICommand {
  constructor(readonly payload: IRegisterAccountCommandPayload) {}
}
