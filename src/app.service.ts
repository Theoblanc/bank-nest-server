import { Injectable } from '@nestjs/common';
import { CreateCommand, CreateCommandDto } from '@/create-command.handler';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class AppService {
  constructor(private readonly commandBus: CommandBus) {}

  getHello(): string {
    return 'Hello World!';
  }

  async create(data: CreateCommandDto) {
    return this.commandBus.execute(new CreateCommand(data));
  }
}
