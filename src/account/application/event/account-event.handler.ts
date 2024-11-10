import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Injectable, Logger } from '@nestjs/common';
import { AccountDepositedEvent } from '@/account/domain/events/account-deposited.event';

@Injectable()
@EventsHandler(AccountDepositedEvent)
export class AccountDepositedHandler
  implements IEventHandler<AccountDepositedEvent>
{
  private readonly logger;

  constructor() {
    this.logger = new Logger(this.constructor.name);
  }

  async handle(event: AccountDepositedEvent) {
    try {
      this.logger.log(
        `Handling AccountDepositedEvent for account ${event.accountId}`
      );
    } catch (error) {
      this.logger.error(
        `Failed to handle AccountDepositedEvent: ${error.message}`,
        error.stack
      );
    }
  }
}
