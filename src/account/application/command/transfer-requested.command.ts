import { ICommand } from '@nestjs/cqrs';

export interface ITransferRequestedCommand {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
}

export class TransferRequestedCommand implements ICommand {
  constructor(readonly payload: ITransferRequestedCommand) {}
}
