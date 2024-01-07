import { BaseEntity } from '@/common/infrastructure/base.entity';
import UserEntity from '@/user/infrastructure/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'accounts' })
export default class AccountEntity extends BaseEntity {
  @Column()
  accountNumber: string;

  @Column()
  ownerName: string;

  @Column('decimal', { precision: 10, scale: 2 })
  balance: number;

  @ManyToOne(() => UserEntity, (user) => user.accounts)
  user: UserEntity;
}
