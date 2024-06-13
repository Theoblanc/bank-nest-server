import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMeQuery } from './get-me.query';
import { UserDTO } from '@/user/application/query/user.dto';
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
    const foundUser = await this.userRepository.findOne({
      where: { id: query.userId }
    });
    if (!foundUser) {
      throw new Error('User not found');
    }

    return foundUser;
  }
}
