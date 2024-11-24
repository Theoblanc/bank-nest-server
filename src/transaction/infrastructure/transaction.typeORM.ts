import { Injectable, Logger } from '@nestjs/common';

import { BaseTypeORM } from '@common/infrastructure/base.typeORM';
import { ITransactionRepository } from '@/transaction/domain/transaction.repository';
import { TransactionEntity } from '@/transaction/infrastructure/transaction.entity';
import { Transaction } from '@/transaction/domain/transaction.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionFactory } from '@/transaction/domain/transaction.factory';

@Injectable()
export class TransactionTypeORM
  extends BaseTypeORM<TransactionEntity, Transaction>
  implements ITransactionRepository
{
  readonly logger: Logger;
  constructor(
    @InjectRepository(TransactionEntity)
    readonly transactionRepository: Repository<TransactionEntity>,
    readonly factory: TransactionFactory
  ) {
    super(factory);
    this.logger = new Logger(this.constructor.name);
  }
}
