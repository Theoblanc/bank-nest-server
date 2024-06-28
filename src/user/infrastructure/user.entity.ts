import { Column, Entity, Index, OneToMany } from 'typeorm';
import { UserProperties, UserRole } from '../domain/user.model';
import { BaseEntity } from '@/common/infrastructure/base.entity';
import AccountEntity from '@/account/infrastructure/account.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export default class UserEntity extends BaseEntity implements UserProperties {
  @Column({ unique: true })
  email: string;

  @Index()
  @Column()
  name: string;

  @Column({ nullable: true })
  @Exclude()
  password?: string;

  @Index()
  @Column({ nullable: true })
  phone?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole;

  @OneToMany(() => AccountEntity, (account) => account.user, { nullable: true })
  accounts?: AccountEntity[];
}
