import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async onModuleInit() {
    // 필요한 토픽을 구독합니다.
    this.kafkaClient.subscribeToResponseOf('my-topic');
    await this.kafkaClient.connect();
  }

  async sendHello() {
    return this.kafkaClient.send('my-topic', { message: 'Hello Kafka' });
  }
}
