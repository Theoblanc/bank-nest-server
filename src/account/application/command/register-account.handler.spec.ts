import { RegisterAccountHandler } from '@/account/application/command/register-account.handler';
import { IAccountRepository } from '@/account/domain/account.repository';
import { AccountFactory } from '@/account/domain/account.factory';
import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryToken } from '@common/infrastructure/repository-token';
import { MockFactory } from '../../../../test/mocks/mock-factory';
import { AccountType } from '@/account/domain/account.model';
import { RegisterAccountCommand } from '@/account/application/command/register-account.command';
import { IUserRepository } from '@/user/domain/user.repository';
import { NotFoundException } from '@nestjs/common';

describe('Register Account Command Handler', () => {
  let handler: RegisterAccountHandler;
  let accountRepository: jest.Mocked<IAccountRepository>;
  let userRepository: jest.Mocked<IUserRepository>;
  let factory: jest.Mocked<AccountFactory>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterAccountHandler,
        {
          provide: RepositoryToken.ACCOUNT,
          useValue: {
            save: jest.fn(),
            newId: jest.fn().mockReturnValue('account-id-1')
          }
        },
        {
          provide: RepositoryToken.USER,
          useValue: {
            findOne: jest.fn()
          }
        },
        {
          provide: AccountFactory,
          useValue: MockFactory
        }
      ]
    }).compile();

    handler = module.get<RegisterAccountHandler>(RegisterAccountHandler);
    accountRepository = module.get<jest.Mocked<IAccountRepository>>(
      RepositoryToken.ACCOUNT
    );
    userRepository = module.get<jest.Mocked<IUserRepository>>(
      RepositoryToken.USER
    );
    factory = module.get<jest.Mocked<AccountFactory>>(AccountFactory);
  });

  it('should successfully register an account', async () => {
    const mockUser = {
      properties: jest.fn().mockReturnValue({
        id: 'user-1',
        name: 'John Doe'
      }),
      commit: jest.fn(),
      register: jest.fn()
    };

    const mockAccount = {
      commit: jest.fn(),
      properties: jest.fn().mockReturnValue({
        id: 'account-id-1',
        type: AccountType.PERSONAL,
        ownerName: 'John Doe',
        accountNumber: '12345678911234',
        user: mockUser.properties(),
        balance: 1000
      }),
      getBalance: jest.fn(),
      deposit: jest.fn(),
      withdraw: jest.fn()
    };

    userRepository.findOne.mockResolvedValue(mockUser);
    factory.create.mockReturnValue(mockAccount);

    const command = new RegisterAccountCommand({
      accountType: AccountType.PERSONAL,
      userId: 'user-1',
      balance: 1000
    });

    await handler.execute(command);

    expect(mockUser.properties).toHaveBeenCalled();
    expect(userRepository.findOne).toHaveBeenCalledWith({
      where: { id: 'user-1' }
    });
    expect(factory.create).toHaveBeenCalledWith({
      id: 'account-id-1',
      type: AccountType.PERSONAL,
      ownerName: 'John Doe',
      accountNumber: '12345678911234',
      user: mockUser.properties(),
      balance: 1000
    });
    expect(accountRepository.save).toHaveBeenCalledWith(mockAccount, null);
    expect(mockAccount.commit).toHaveBeenCalled();
  });

  it('should throw NotFoundException when user not found', async () => {
    userRepository.findOne.mockResolvedValue(null);

    const command = new RegisterAccountCommand({
      accountType: AccountType.PERSONAL,
      userId: 'non-existent-user',
      balance: 1000
    });

    await expect(handler.execute(command)).rejects.toThrow(NotFoundException);
  });
});
