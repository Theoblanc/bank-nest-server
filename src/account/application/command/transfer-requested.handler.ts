import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TransferRequestedCommand } from './transfer-requested.command';
import {
  BadRequestException,
  Inject,
  InternalServerErrorException,
  Logger
} from '@nestjs/common';
import { RepositoryToken } from '@common/infrastructure/repository-token';
import { IAccountRepository } from '@/account/domain/account.repository';
import { AccountFactory } from '@/account/domain/account.factory';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@CommandHandler(TransferRequestedCommand)
export class TransferRequestedCommandHandler
  implements ICommandHandler<TransferRequestedCommand>
{
  private readonly logger: Logger;

  constructor(
    @Inject(RepositoryToken.ACCOUNT)
    private readonly accountRepository: IAccountRepository,
    private readonly factory: AccountFactory,
    @InjectEntityManager()
    private readonly entityManager: EntityManager
  ) {
    this.logger = new Logger(TransferRequestedCommandHandler.name);
  }

  async execute(command: TransferRequestedCommand): Promise<void> {
    const { fromAccountId, toAccountId, amount } = command.payload;

    if (fromAccountId === toAccountId) {
      throw new BadRequestException('Cannot transfer to the same account');
    }

    this.logger.log(
      `Starting transfer: ${fromAccountId} -> ${toAccountId}, Amount: ${amount}`
    );

    await this.entityManager.transaction(async (transactionalEntityManager) => {
      try {
        // 1. 송신 계좌 조회 (with lock)
        const fromAccount = await this.accountRepository.findOneAndLock(
          transactionalEntityManager,
          { where: { id: fromAccountId } }
        );

        if (!fromAccount) {
          throw new BadRequestException(
            `Sender account ${fromAccountId} not found.`
          );
        }

        // 2. 수신 계좌 조회 (with lock)
        const toAccount = await this.accountRepository.findOneAndLock(
          transactionalEntityManager,
          { where: { id: toAccountId } }
        );

        if (!toAccount) {
          throw new BadRequestException(
            `Receiver account ${toAccountId} not found.`
          );
        }

        // 3. 도메인 모델로 변환
        const senderAccount = this.factory.create(fromAccount.properties());
        const receiverAccount = this.factory.create(toAccount.properties());

        // 4. 송금 처리
        senderAccount.withdraw(amount);
        receiverAccount.deposit(amount);

        // 5. 이벤트 커밋
        senderAccount.commit();
        receiverAccount.commit();

        // 6. 상태 저장
        await this.accountRepository.save(
          senderAccount,
          transactionalEntityManager
        );
        await this.accountRepository.save(
          receiverAccount,
          transactionalEntityManager
        );

        this.logger.log(
          `Transfer completed: ${fromAccountId} -> ${toAccountId}, Amount: ${amount}`
        );
      } catch (error) {
        this.logger.error(
          `Transfer failed: ${fromAccountId} -> ${toAccountId}, Amount: ${amount}`,
          error.stack
        );

        if (error instanceof BadRequestException) {
          throw error;
        }

        throw new InternalServerErrorException(
          'An error occurred while processing the transfer'
        );
      }
    });
  }
}
