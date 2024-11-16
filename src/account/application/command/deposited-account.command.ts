import { ICommand } from '@nestjs/cqrs';

export interface IDepositedAccountCommand {
  accountId: string;
  balance: number;
}

export class DepositedAccountCommand implements ICommand {
  constructor(readonly payload: IDepositedAccountCommand) {}
}
