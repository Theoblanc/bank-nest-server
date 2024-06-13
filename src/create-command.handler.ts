// create-command.handler.ts
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

// create-command.dto.ts
export class CreateCommandDto {
  constructor(public readonly data: string) {}
}

export class CreateCommand implements ICommand {
  constructor(public readonly data: CreateCommandDto) {}
}

@CommandHandler(CreateCommand)
export class CreateCommandHandler implements ICommandHandler<CreateCommand> {
  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy
  ) {}

  async execute(command: CreateCommand): Promise<void> {
    this.client.emit('create_event', command.data);
  }
}
