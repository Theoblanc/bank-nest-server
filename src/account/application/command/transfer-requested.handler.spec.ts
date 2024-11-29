import { Test, TestingModule } from '@nestjs/testing';
import { TransferRequestedCommand } from './transfer-requested.command';
import { AccountFactory } from '@/account/domain/account.factory';
import { IAccountRepository } from '@/account/domain/account.repository';
import { DataSource } from 'typeorm';
import { RepositoryToken } from '@common/infrastructure/repository-token';
import {
  BadRequestException,
  InternalServerErrorException
} from '@nestjs/common';
import { AccountType, Account } from '@/account/domain/account.model';
import { TransferRequestedCommandHandler } from '@/account/application/command/transfer-requested.handler';

describe('Transfer Requested Command Handler', () => {
  let commandHandler: TransferRequestedCommandHandler;
  let accountRepository: jest.Mocked<IAccountRepository>;
  let factory: jest.Mocked<AccountFactory>;
  let dataSource: jest.Mocked<DataSource>;

  const mockDataSource = {
    transaction: jest.fn((cb) => cb())
  };

  const mockUser = {
    id: 'user-1',
    name: 'Test User',
    email: 'test@test.com'
  };

  const createMockAccount = (
    id: string,
    balance: number
  ): jest.Mocked<Account> => {
    const mockProperties = jest.fn().mockReturnValue({
      id,
      type: AccountType.PERSONAL,
      accountNumber: id === 'account-1' ? '1234567890' : '0987654321',
      ownerName: id === 'account-1' ? 'From User' : 'To User',
      balance,
      user: mockUser,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return {
      properties: mockProperties,
      getBalance: jest.fn().mockReturnValue(balance),
      deposit: jest.fn(),
      withdraw: jest.fn(),
      commit: jest.fn()
    };
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransferRequestedCommandHandler,
        {
          provide: RepositoryToken.ACCOUNT,
          useValue: {
            findOneAndLock: jest.fn(),
            save: jest.fn().mockResolvedValue(null)
          }
        },
        {
          provide: DataSource,
          useValue: mockDataSource
        },
        {
          provide: AccountFactory,
          useValue: {
            create: jest.fn()
          }
        }
      ]
    }).compile();

    commandHandler = module.get<TransferRequestedCommandHandler>(
      TransferRequestedCommandHandler
    );
    accountRepository = module.get(RepositoryToken.ACCOUNT);
    factory = module.get(AccountFactory);
    dataSource = module.get(DataSource);
  });

  describe('execute', () => {
    it('should successfully transfer money between accounts', async () => {
      const fromAccount = createMockAccount('account-1', 1000);
      const toAccount = createMockAccount('account-2', 500);

      const command = new TransferRequestedCommand({
        fromAccountId: 'account-1',
        toAccountId: 'account-2',
        amount: 500
      });

      accountRepository.findOneAndLock
        .mockResolvedValueOnce(fromAccount)
        .mockResolvedValueOnce(toAccount);

      factory.create
        .mockReturnValueOnce(fromAccount)
        .mockReturnValueOnce(toAccount);

      // Act
      await commandHandler.execute(command);

      // Assert
      expect(accountRepository.findOneAndLock).toHaveBeenCalledTimes(2);
      expect(accountRepository.save).toHaveBeenCalledTimes(2);
      expect(fromAccount.withdraw).toHaveBeenCalledWith(500);
      expect(toAccount.deposit).toHaveBeenCalledWith(500);
      expect(fromAccount.commit).toHaveBeenCalled();
      expect(toAccount.commit).toHaveBeenCalled();
      expect(dataSource.transaction).toHaveBeenCalled();
    });

    it('should throw BadRequestException when transferring to the same account', async () => {
      const command = new TransferRequestedCommand({
        fromAccountId: 'account-1',
        toAccountId: 'account-1',
        amount: 500
      });

      await expect(commandHandler.execute(command)).rejects.toThrow(
        BadRequestException
      );
    });

    it('should throw BadRequestException when sender account not found', async () => {
      const command = new TransferRequestedCommand({
        fromAccountId: 'non-existent',
        toAccountId: 'account-2',
        amount: 500
      });

      accountRepository.findOneAndLock.mockResolvedValueOnce(null);

      await expect(commandHandler.execute(command)).rejects.toThrow(
        BadRequestException
      );
    });

    it('should throw BadRequestException when receiver account not found', async () => {
      const fromAccount = createMockAccount('account-1', 1000);

      const command = new TransferRequestedCommand({
        fromAccountId: 'account-1',
        toAccountId: 'non-existent',
        amount: 500
      });

      accountRepository.findOneAndLock
        .mockResolvedValueOnce(fromAccount)
        .mockResolvedValueOnce(null);

      await expect(commandHandler.execute(command)).rejects.toThrow(
        BadRequestException
      );
    });

    it('should throw BadRequestException when insufficient balance', async () => {
      const fromAccount = createMockAccount('account-1', 1000);
      const toAccount = createMockAccount('account-2', 500);

      fromAccount.withdraw.mockImplementation(() => {
        throw new BadRequestException('잔액이 부족합니다');
      });

      const command = new TransferRequestedCommand({
        fromAccountId: 'account-1',
        toAccountId: 'account-2',
        amount: 2000
      });

      accountRepository.findOneAndLock
        .mockResolvedValueOnce(fromAccount)
        .mockResolvedValueOnce(toAccount);

      factory.create
        .mockReturnValueOnce(fromAccount)
        .mockReturnValueOnce(toAccount);

      await expect(commandHandler.execute(command)).rejects.toThrow(
        BadRequestException
      );
    });

    it('should throw InternalServerErrorException on unexpected errors', async () => {
      const command = new TransferRequestedCommand({
        fromAccountId: 'account-1',
        toAccountId: 'account-2',
        amount: 500
      });

      accountRepository.findOneAndLock.mockRejectedValue(
        new Error('Unexpected error')
      );

      await expect(commandHandler.execute(command)).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });
});
