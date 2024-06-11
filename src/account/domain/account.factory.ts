import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
  Account,
  AccountEssentialProperties,
  AccountImplement,
  AccountProperties
} from '@/account/domain/account.model';

export class AccountFactory {
  constructor(
    @Inject(EventPublisher)
    private readonly eventPublisher: EventPublisher
  ) {}

  create(properties: AccountEssentialProperties): Account {
    return this.eventPublisher.mergeObjectContext(
      new AccountImplement(properties)
    );
  }

  reconstitute(properties: AccountProperties): Account {
    return this.eventPublisher.mergeObjectContext(
      new AccountImplement(properties)
    );
  }
}
