import { User, UserProperties } from './user.model';

export interface IUserRepository {
  save(user: UserProperties): void;
  findByEmail(email: string): Promise<User | null>;
}
