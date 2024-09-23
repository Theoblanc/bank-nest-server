import { BaseTypeORM } from '@common/infrastructure/base.typeORM';
import AccountEntity from '@/account/infrastructure/account.entity';
import { Account } from '@/account/domain/account.model';
import { AccountFactory } from '@/account/domain/account.factory';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAccountRepository } from '@/account/domain/account.repository';

export class AccountTypeORM
  extends BaseTypeORM<AccountEntity, Account>
  implements IAccountRepository
{
  private readonly logger: Logger;
  constructor(
    readonly factory: AccountFactory,
    @InjectRepository(AccountEntity)
    readonly accountRepo: Repository<AccountEntity>
  ) {
    super(factory);
    this.logger = new Logger(this.constructor.name);
  }

  create(model: Account): Account {
    try {
      const entity = this.modelToEntity(model);
      const result = this.accountRepo.create(entity);
      this.logger.log(`Created with the following id: ${result.id}`);
      return this.entityToModel(result);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async save(model: Account): Promise<null> {
    try {
      const entity = this.modelToEntity(model);
      const result = await this.accountRepo.save(entity);
      this.logger.log(`Saved with the following id: ${result.id}`);
      return null;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
