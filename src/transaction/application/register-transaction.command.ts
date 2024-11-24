import { TransactionType } from '@/transaction/infrastructure/transaction.entity';

export interface IRegisterTransactionPayload {
  transactionType: TransactionType;
  fromAccountId: string | null;
  toAccountId: string;
  amount: number;
  description?: string;
}

export class RegisterTransactionCommand {
  constructor(readonly payload: IRegisterTransactionPayload) {}
}
