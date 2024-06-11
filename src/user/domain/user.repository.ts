import { IBaseRepository } from '@/common/domain/base.repository';
import { User } from './user.model';
import UserEntity from '@/user/infrastructure/user.entity';

export interface IUserRepository extends IBaseRepository<UserEntity, User> {
  save(user: User): Promise<null>;
  findByEmail(email: string): Promise<User | null>;
}
