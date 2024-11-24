import { ICommand } from '@nestjs/cqrs';

export interface ITransferRequestedCommand {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description?: string;
}

export class TransferRequestedCommand implements ICommand {
  constructor(readonly payload: ITransferRequestedCommand) {}
}
