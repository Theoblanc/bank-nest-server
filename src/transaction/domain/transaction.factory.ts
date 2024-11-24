import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
  Transaction,
  TransactionImplement,
  TransactionProperties
} from '@/transaction/domain/transaction.model';

export class TransactionFactory {
  constructor(
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher
  ) {}

  create(properties: TransactionProperties): Transaction {
    return this.eventPublisher.mergeObjectContext(
      new TransactionImplement(properties)
    );
  }

  reconstitute(properties: TransactionProperties): Transaction {
    return this.eventPublisher.mergeObjectContext(
      new TransactionImplement(properties)
    );
  }
}
