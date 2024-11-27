import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TransferRequestedCommand } from './transfer-requested.command';
import { Inject, Logger } from '@nestjs/common';
import { RepositoryToken } from '@common/infrastructure/repository-token';
import { IAccountRepository } from '@/account/domain/account.repository';
import { AccountFactory } from '@/account/domain/account.factory';

@CommandHandler(TransferRequestedCommand)
export class TransferRequestedCommandHandler
  implements ICommandHandler<TransferRequestedCommand>
{
  private readonly logger: Logger;

  constructor(
    @Inject(RepositoryToken.ACCOUNT)
    private readonly accountRepository: IAccountRepository,
    private readonly factory: AccountFactory
  ) {
    this.logger = new Logger(TransferRequestedCommandHandler.name);
  }

  async execute(command: TransferRequestedCommand): Promise<void> {
    const { fromAccountId, toAccountId, amount } = command.payload;

    this.logger.log(
      `Processing transfer: ${fromAccountId} -> ${toAccountId}, Amount: ${amount}`
    );

    // 1. 송신 계좌 조회
    const fromAccount = await this.accountRepository.findOne({
      where: { id: fromAccountId }
    });

    if (!fromAccount) {
      throw new Error(`Sender account ${fromAccountId} not found.`);
    }

    // 2. 수신 계좌 조회
    const toAccount = await this.accountRepository.findOne({
      where: { id: toAccountId }
    });

    if (!toAccount) {
      throw new Error(`Receiver account ${toAccountId} not found.`);
    }

    // 3. 도메인 모델로 변환
    const senderAccount = this.factory.create(fromAccount.properties());
    const receiverAccount = this.factory.create(toAccount.properties());

    // 4. 송금 처리
    senderAccount.withdraw(amount); // 송신 계좌 잔액 차감
    receiverAccount.deposit(amount); // 수신 계좌 잔액 증가

    // 5. 상태 저장
    await this.accountRepository.save(senderAccount);
    await this.accountRepository.save(receiverAccount);

    this.logger.log(
      `Transfer completed: ${fromAccountId} -> ${toAccountId}, Amount: ${amount}`
    );
  }
}
