import { BaseEntity } from '@/common/infrastructure/base.entity';
import UserEntity from '@/user/infrastructure/user.entity';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { TransactionEntity } from '@/transaction/infrastructure/transaction.entity';

@Entity({ name: 'accounts' })
export default class AccountEntity extends BaseEntity {
  @Column({ length: 14, unique: true })
  @Index()
  accountNumber: string;

  @Column()
  ownerName: string;

  @Column('decimal', { precision: 10, scale: 2 })
  balance: number;

  @ManyToOne(() => UserEntity, (user) => user.accounts)
  user: UserEntity;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.fromAccount)
  transactionsFrom?: TransactionEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.toAccount)
  transactionsTo?: TransactionEntity[];
}
