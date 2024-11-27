import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMeQuery } from './get-me.query';
import { UserDTO } from '@/user/interfaces/dto/user.dto';
import { Inject } from '@nestjs/common';
import { RepositoryToken } from '@common/infrastructure/repository-token';
import { IUserRepository } from '@/user/domain/user.repository';
import { UserFactory } from '@/user/domain/user.factory';

@QueryHandler(GetMeQuery)
export class GetMeHandler implements IQueryHandler<GetMeQuery> {
  constructor(
    @Inject(RepositoryToken.USER)
    private userRepository: IUserRepository,
    private readonly factory: UserFactory
  ) {}

  async execute(query: GetMeQuery): Promise<UserDTO> {
    // 1. Redis에서 캐시된 데이터 확인

    // 2. 캐시에 없으면 데이터베이스에서 조회

    const foundUser = await this.userRepository.findOne({
      where: { id: query.userId }
    });

    if (!foundUser) {
      throw new Error('User not found');
    }

    // 3. 조회된 데이터를 Redis에 캐시로 저장

    return foundUser.properties();
  }
}
