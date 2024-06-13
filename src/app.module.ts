import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeORMFactory } from '@common/infrastructure/settings/typeorm.factory';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { CommonModule } from '@common/common.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

const modules = [UserModule, AccountModule, CommonModule];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: typeORMFactory,
      inject: [ConfigService]
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`
    }),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`
          ],
          queue: 'main_queue',
          queueOptions: {
            durable: false
          }
        }
      }
    ]),
    ...modules
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
