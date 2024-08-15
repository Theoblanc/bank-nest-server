import {
  Account,
  AccountEssentialProperties,
  AccountProperties
} from '@/account/domain/account.model';
import { IBaseRepository } from '@common/domain/base.repository';
import { User } from '@/user/domain/user.model';
import AccountEntity from '@/account/infrastructure/account.entity';

export interface IAccountRepository
  extends IBaseRepository<AccountEntity, Account> {
  create(account: AccountEssentialProperties): Promise<AccountProperties>;
  save(account: Account): Promise<null>;
}
