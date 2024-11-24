import { ICommand } from '@nestjs/cqrs';

export interface IWithdrawAccountPayload {
  accountId: string;
  balance: number;
}

export class WithdrawAccountCommand implements ICommand {
  constructor(readonly payload: IWithdrawAccountPayload) {}
}
