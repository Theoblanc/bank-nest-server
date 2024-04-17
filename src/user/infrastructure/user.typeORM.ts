import { IUserRepository } from '@/user/domain/user.repository';
import { Inject, Injectable } from '@nestjs/common';
import UserEntity from '@/user/infrastructure/user.entity';
import { Repository } from 'typeorm';
import { UserFactory } from '@/user/domain/user.factory';
import { User, UserProperties } from '@/user/domain/user.model';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserTypeORM implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userFactory: UserFactory
  ) {}

  async save(user: UserProperties) {
    const savedUser = await this.userRepository.save(user);
    this.userFactory.create(savedUser);
  }
  async findByEmail(email: string): Promise<User | null> {
    const userEntity: UserEntity = await this.userRepository.findOne({
      where: { email }
    });
    return this.userFactory.reconstitute(userEntity);
  }
}
