import { IBaseRepository } from '@common/domain/base.repository';
import { TransactionEntity } from '@/transaction/infrastructure/transaction.entity';
import { Transaction } from '@/transaction/domain/transaction.model';

export interface ITransactionRepository
  extends IBaseRepository<TransactionEntity, Transaction> {}
