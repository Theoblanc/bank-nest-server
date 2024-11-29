import { Account } from '@/account/domain/account.model';
import { IBaseRepository } from '@common/domain/base.repository';
import AccountEntity from '@/account/infrastructure/account.entity';
import { EntityManager, FindOneOptions } from 'typeorm';

export interface IAccountRepository
  extends IBaseRepository<AccountEntity, Account> {
  create(account: Account): Account;
  save(
    model: Account,
    transactionalEntityManager: EntityManager | null
  ): Promise<null>;

  findOne(option: FindOneOptions): Promise<Account>;
  update(id: string, updatedAccount: Partial<Account>): Promise<Account>;
  findOneAndLock(
    transactionalEntityManager: EntityManager,
    options: FindOneOptions<AccountEntity>
  ): Promise<Account>;
}
