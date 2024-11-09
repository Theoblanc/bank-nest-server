import { Global, Module } from '@nestjs/common';
import { KeyvStore } from '@common/infrastructure/settings/keyv-cache-store';

@Global()
@Module({
  providers: [
    {
      provide: 'CACHE_REDIS',
      useClass: KeyvStore
    }
  ],
  exports: ['CACHE_REDIS']
})
export class CacheModule {}
