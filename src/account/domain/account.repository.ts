import { Account } from '@/account/domain/account.model';

export interface IAccountRepository {
  save(account: Account): Promise<null>;
}
