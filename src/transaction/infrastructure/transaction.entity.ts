import { BaseEntity } from '@common/infrastructure/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import AccountEntity from '@/account/infrastructure/account.entity';

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  TRANSFER = 'TRANSFER'
}

@Entity({ name: 'transactions' })
export class TransactionEntity extends BaseEntity {
  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: TransactionType
  })
  transactionType: TransactionType;

  @ManyToOne(() => AccountEntity, (account) => account.transactionsFrom)
  @JoinColumn({ name: 'fromAccountId' })
  @Index()
  fromAccount: AccountEntity;

  @ManyToOne(() => AccountEntity, (account) => account.transactionsTo)
  @JoinColumn({ name: 'toAccountId' })
  @Index()
  toAccount: AccountEntity;

  @Column('varchar', { length: 255, nullable: true })
  description: string | null;
}
