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
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'] // Kafka 브로커 주소
          },
          consumer: {
            groupId: 'my-consumer-' + Math.random() // 고유한 그룹 ID 설정
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
