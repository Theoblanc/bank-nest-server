import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { IUserRepository } from '../domain/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from '../infrastructure/user.entity';
import { UserDTO } from '../application/query/user.dto';
import { RegisterUserCommand } from '../application/command/register-user.command';
import { UserRole } from '../domain/user.model';
import { RegisterUserArgsDTO } from './dto/register-user.args';
import { GetMeQuery } from '@/user/application/query/get-me.query';

@Resolver(() => UserDTO)
export class UserResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    @InjectRepository(UserEntity)
    private readonly repository: IUserRepository
  ) {}

  //QURRY BUS로 만들기
  @Query(() => UserDTO)
  async findUser(@Args('email') email: string) {
    return this.repository.findByEmail(email);
  }

  @Query(() => UserDTO, { nullable: true })
  async getMe(@Args('userId') userId: string) {
    const query = new GetMeQuery(userId);
    return this.queryBus.execute(query);
  }

  @Mutation(() => String, { nullable: true })
  async registerUser(@Args('input') args: RegisterUserArgsDTO) {
    const { email, name, role = UserRole.USER } = args;
    const command = new RegisterUserCommand({
      email,
      name,
      role
    });

    await this.commandBus.execute(command);
  }
}
