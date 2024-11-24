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
  @JoinColumn({ name: 'from_account_id' })
  fromAccount?: AccountEntity;

  @Column('uuid', { name: 'from_account_id' })
  @Index()
  fromAccountId: string;

  @ManyToOne(() => AccountEntity, (account) => account.transactionsTo)
  @JoinColumn({ name: 'to_account_id' })
  toAccount?: AccountEntity;

  @Column('uuid', { name: 'to_account_id' })
  @Index()
  toAccountId: string;

  @Column('varchar', { length: 255, nullable: true })
  description?: string | null;
}
