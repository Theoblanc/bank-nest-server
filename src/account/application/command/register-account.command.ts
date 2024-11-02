import { ICommand } from '@nestjs/cqrs';
import { AccountType } from '@/account/domain/account.model';

export interface IRegisterAccountCommandPayload {
  readonly accountType: AccountType;
  readonly userId?: string;
  readonly balance?: number;
}

export class RegisterAccountCommand implements ICommand {
  constructor(readonly payload: IRegisterAccountCommandPayload) {}
}
