import { Injectable } from '@nestjs/common';
import { Saga, ofType } from '@nestjs/cqrs';
import {
  AccountDepositedEvent,
  IAccountDepositedEvent
} from '@/account/domain/events/account-deposited.event';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountDepositedSaga {
  @Saga()
  accountDeposited = (events$) => {
    return events$.pipe(
      ofType(AccountDepositedEvent),
      map((event: { payload: IAccountDepositedEvent }) => {
        console.log(
          `Saga handling AccountDepositedEvent for account ${event.payload.accountId}`
        );
      })
    );
  };
}
