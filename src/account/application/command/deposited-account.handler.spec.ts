import { DepositedAccountCommandHandler } from '@/account/application/command/deposited-account.handler';
import { IAccountRepository } from '@/account/domain/account.repository';
import { AccountFactory } from '@/account/domain/account.factory';
import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryToken } from '@common/infrastructure/repository-token';
import { MockFactory } from '../../../../test/mocks/mock-factory';
import { DepositedAccountCommand } from '@/account/application/command/deposited-account.command';

describe('Deposited Account Command Handler', () => {
  let handler: DepositedAccountCommandHandler;
  let accountRepository: jest.Mocked<IAccountRepository>;
  let factory: jest.Mocked<AccountFactory>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepositedAccountCommandHandler, // RegisterAccountHandler 대신 실제 테스트할 핸들러로 변경
        {
          provide: RepositoryToken.ACCOUNT,
          useValue: {
            save: jest.fn(),
            newId: jest.fn().mockReturnValue('account-id-1'),
            findOne: jest.fn()
          }
        },
        {
          provide: AccountFactory,
          useValue: MockFactory
        }
      ]
    }).compile();

    handler = module.get<DepositedAccountCommandHandler>(
      DepositedAccountCommandHandler
    );
    accountRepository = module.get<jest.Mocked<IAccountRepository>>(
      RepositoryToken.ACCOUNT
    );
    factory = module.get<jest.Mocked<AccountFactory>>(AccountFactory);
  });

  it('should success to deposited account', async () => {
    // Given
    const mockAccount = {
      commit: jest.fn(),
      properties: jest.fn().mockReturnValue({
        id: 'account-id-1',
        balance: 1000,
        userId: 'user-1'
      }),
      getBalance: jest.fn().mockReturnValue(1000),
      deposit: jest.fn(),
      withdraw: jest.fn()
    };

    accountRepository.findOne.mockResolvedValue(mockAccount);
    factory.create.mockReturnValue(mockAccount);

    const command = new DepositedAccountCommand({
      accountId: 'account-id-1',
      balance: 500
    });

    // When
    await handler.execute(command);

    // Then
    expect(accountRepository.findOne).toHaveBeenCalledWith({
      where: { id: 'account-id-1' }
    });
    expect(mockAccount.properties).toHaveBeenCalled();
    expect(factory.create).toHaveBeenCalledWith({
      id: 'account-id-1',
      balance: 1000,
      userId: 'user-1'
    });
    expect(mockAccount.deposit).toHaveBeenCalledWith(500);
    expect(mockAccount.commit).toHaveBeenCalled();
  });

  it('should throw error when account not found', async () => {
    // Given
    accountRepository.findOne.mockResolvedValue(null);
    const command = new DepositedAccountCommand({
      accountId: 'non-existing-account',
      balance: 500
    });

    // When & Then
    await expect(handler.execute(command)).rejects.toThrow();
  });
});
