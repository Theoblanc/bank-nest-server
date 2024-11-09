import { Global, Module } from '@nestjs/common';
import { KeyvStore } from '@common/infrastructure/settings/keyv-cache-store';
import { CACHE_STORE } from '@common/domain/constants/cache.constants';

@Global()
@Module({
  providers: [
    {
      provide: CACHE_STORE,
      useClass: KeyvStore
    }
  ],
  exports: ['CACHE_REDIS']
})
export class CacheModule {}
