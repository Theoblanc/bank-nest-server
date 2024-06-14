import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

export async function RMQFactory(configService: ConfigService) {
  return {
    name: 'RABBITMQ_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${configService.get('RABBITMQ_USER')}:${configService.get(
          'RABBITMQ_PASSWORD'
        )}@${configService.get('RABBITMQ_HOST')}:${configService.get(
          'RABBITMQ_PORT'
        )}`
      ],
      queue: 'main_queue'
    }
  };
}
