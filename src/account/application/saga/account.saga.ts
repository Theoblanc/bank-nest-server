import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType } from '@nestjs/cqrs';
import {
  AccountDepositedEvent,
  IAccountDepositedEvent
} from '@/account/domain/events/account-deposited.event';
import { map } from 'rxjs/operators';
import { AccountWithdrawEvent } from '@/account/domain/events/account-withdarw.event';
import { DepositedAccountCommand } from '@/account/application/command/deposited-account.command';
import { WithdrawAccountCommand } from '@/account/application/command/withdraw-accont.command';
import { TransferRequestedEvent } from '@/account/domain/events/transfer-requested.event';

@Injectable()
export class AccountSaga {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger(AccountSaga.name);
  }
  @Saga()
  accountDeposited = (events$) => {
    return events$.pipe(
      ofType(AccountDepositedEvent),
      map((event: { payload: IAccountDepositedEvent }) => {
        this.logger.log(
          `Saga handling AccountDepositedEvent for account ${event.payload.accountId}`
        );

        return new DepositedAccountCommand(event.payload);
      })
    );
  };
  @Saga()
  accountWithDraw = (events$) => {
    return events$.pipe(
      ofType(AccountWithdrawEvent),
      map((event: { payload: IAccountDepositedEvent }) => {
        this.logger.log(
          `Saga handling AccountWithdrawEvent for account ${event.payload.accountId}`
        );

        return new WithdrawAccountCommand(event.payload);
      })
    );
  };

  @Saga()
  transferRequest = (events$) => {
    return events$.pipe(
      ofType(TransferRequestedEvent),
      map((event: TransferRequestedEvent) => {
        this.logger.log(
          `Saga handling TransferRequestedEvent from ${event.payload.fromAccountId} to ${event.payload.toAccountId}`
        );

        const withdrawCommand = new WithdrawAccountCommand({
          accountId: event.payload.fromAccountId,
          balance: event.payload.amount
        });

        const depositCommand = new DepositedAccountCommand({
          accountId: event.payload.toAccountId,
          balance: event.payload.amount
        });

        return [withdrawCommand, depositCommand];
      })
    );
  };
}
