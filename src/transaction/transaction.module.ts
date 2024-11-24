import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from '@/transaction/infrastructure/transaction.entity';
import { RepositoryToken } from '@common/infrastructure/repository-token';
import { TransactionTypeORM } from '@/transaction/infrastructure/transaction.typeORM';
import { TransactionResolver } from '@/transaction/interfaces/transaction.resolver';
import { RegisterTransactionHandler } from '@/transaction/application/register-transaction.handler';

export const TransactionRepositoryImpl: Provider = {
  provide: RepositoryToken.TRANSACTION,
  useClass: TransactionTypeORM
};

const handles = [RegisterTransactionHandler];
const resolvers = [TransactionResolver];
@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity])],
  providers: [TransactionRepositoryImpl, ...handles, ...resolvers],
  exports: [TransactionRepositoryImpl]
})
export class TransactionModule {}
