import { RegisterUserHandler } from '@/user/application/command/register-user.handler';
import { IUserRepository } from '@/user/domain/user.repository';
import { UserFactory } from '@/user/domain/user.factory';
import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryToken } from '@common/infrastructure/repository-token';
import { RegisterUserCommand } from '@/user/application/command/register-user.command';
import { UserRole } from '@/user/domain/user.model';
import { MockFactory } from '../../../../test/mocks/mock-factory';

describe('registerUserHandler', () => {
  let handler: RegisterUserHandler;
  let userRepository: jest.Mocked<IUserRepository>;
  let factory: jest.Mocked<UserFactory>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUserHandler,
        {
          provide: RepositoryToken.USER,
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            findByEmail: jest.fn(),
            newId: jest.fn().mockReturnValue('new-user-id')
          }
        },
        {
          provide: UserFactory,
          useValue: MockFactory
        }
      ]
    }).compile();

    handler = module.get<RegisterUserHandler>(RegisterUserHandler);
    userRepository = module.get<jest.Mocked<IUserRepository>>(
      RepositoryToken.USER
    );
    factory = module.get<jest.Mocked<UserFactory>>(UserFactory);
  });

  it('should successfully register a new user', async () => {
    const command = new RegisterUserCommand({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      role: UserRole.USER
    });

    userRepository.findByEmail.mockResolvedValue(null);
    const mockUser = {
      register: jest.fn(),
      commit: jest.fn(),
      properties: jest.fn().mockReturnValue({
        id: 'user-1',
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        role: UserRole.USER
      })
    };
    factory.create.mockReturnValue(mockUser);

    await handler.execute(command);

    // Expectations
    expect(userRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
    expect(userRepository.newId).toHaveBeenCalled();
    expect(factory.create).toHaveBeenCalledWith({
      id: 'new-user-id',
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      role: UserRole.USER
    });
    expect(mockUser.register).toHaveBeenCalled();
    expect(userRepository.newId).toHaveBeenCalled();
    expect(userRepository.save).toHaveBeenCalledWith(mockUser);
    expect(mockUser.commit).toHaveBeenCalled();
  });
});
