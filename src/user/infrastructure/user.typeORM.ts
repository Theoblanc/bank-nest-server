import { IUserRepository } from '@/user/domain/user.repository';
import { Injectable } from '@nestjs/common';
import UserEntity from '@/user/infrastructure/user.entity';
import { Repository } from 'typeorm';
import { UserFactory } from '@/user/domain/user.factory';
import { User } from '@/user/domain/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeORM } from '@common/infrastructure/base.typeORM';

@Injectable()
export class UserTypeORM
  extends BaseTypeORM<UserEntity, User>
  implements IUserRepository
{
  constructor(
    readonly factory: UserFactory,
    @InjectRepository(UserEntity) readonly repo: Repository<UserEntity>
  ) {
    super(factory);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    return this.entityToModel(user);
  }
}
