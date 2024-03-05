import { User } from './user.model';

export interface IUserRepository {
  createUser();
  findByEmail(email: string): Promise<User | null>;
}
