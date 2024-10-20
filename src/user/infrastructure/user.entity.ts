import { Column, Entity, Index, OneToMany } from 'typeorm';
import { UserProperties, UserRole } from '../domain/user.model';
import { BaseEntity } from '@/common/infrastructure/base.entity';
import AccountEntity from '@/account/infrastructure/account.entity';
import { Exclude } from 'class-transformer';
import { Field } from '@nestjs/graphql';

@Entity({ name: 'users' })
export default class UserEntity extends BaseEntity implements UserProperties {
  @Field()
  @Column({ unique: true })
  email: string;

  @Index()
  @Field()
  @Column()
  name: string;

  @Column({ nullable: true })
  @Exclude()
  password?: string;

  @Field()
  @Column({ nullable: true })
  phone?: string;

  @Field()
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole;

  @OneToMany(() => AccountEntity, (account) => account.user)
  accounts?: AccountEntity[];
}
