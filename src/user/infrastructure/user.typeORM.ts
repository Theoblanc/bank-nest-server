import { IUserRepository } from '@/user/domain/user.repository';
import { Injectable, Logger } from '@nestjs/common';
import UserEntity from '@/user/infrastructure/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { UserFactory } from '@/user/domain/user.factory';
import { User } from '@/user/domain/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeORM } from '@common/infrastructure/base.typeORM';

@Injectable()
export class UserTypeORM
  extends BaseTypeORM<UserEntity, User>
  implements IUserRepository
{
  readonly logger: Logger;

  constructor(
    readonly factory: UserFactory,
    @InjectRepository(UserEntity) readonly userRepo: Repository<UserEntity>
  ) {
    super(factory);
    this.logger = new Logger(this.constructor.name);
  }

  async save(model: User): Promise<null> {
    try {
      const entity = this.modelToEntity(model);
      const result = await this.userRepo.save(entity);
      this.logger.log(`Saved with the following id: ${result.id}`);
      return null;
    } catch (error) {
      this.logger.error(error);
    }
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    return this.entityToModel(user);
  }

  async findOne(option: FindOneOptions): Promise<User> {
    const user = await this.userRepo.findOne(option);
    return this.entityToModel(user);
  }
}
