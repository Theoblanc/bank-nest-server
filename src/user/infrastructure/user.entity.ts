import { Column, Entity } from 'typeorm';
import { UserProperties, UserRole } from '../domain/user.model';
import { BaseEntity } from '@/common/infrastructure/base.entity';

@Entity({ name: 'users' })
export default class UserEntity extends BaseEntity implements UserProperties {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password?: string;

  @Column()
  phone?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
}
