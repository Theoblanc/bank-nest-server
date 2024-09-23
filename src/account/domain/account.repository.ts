import { Account } from '@/account/domain/account.model';
import { IBaseRepository } from '@common/domain/base.repository';
import AccountEntity from '@/account/infrastructure/account.entity';

export interface IAccountRepository
  extends IBaseRepository<AccountEntity, Account> {
  create(account: Account): Account;
  save(account: Account): Promise<null>;
}
