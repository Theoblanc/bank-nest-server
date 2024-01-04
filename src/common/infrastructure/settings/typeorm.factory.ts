import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export async function typeORMFactory(
  config: ConfigService,
): Promise<TypeOrmModuleOptions> {
  return {
    type: 'postgres',
    host: config.get('POSTGRES_HOST'),
    port: config.get('POSTGRES_PORT'),
    database: config.get('POSTGRES_DB'),
    username: config.get('POSTGRES_USER'),
    password: config.get('POSTGRES_PASSWORD'),
    synchronize: config.get('POSTGRES_SYNC'),
    logging: config.get('DATABASE_LOGGING'),
    autoLoadEntities: true,
  };
}
