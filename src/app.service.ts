import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class AppService {
  constructor(private readonly commandBus: CommandBus) {}

  getHello(): string {
    return 'Hello World!';
  }
}
