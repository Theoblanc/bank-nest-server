import { Module } from '@nestjs/common';
import { CommonInterfacesModule } from './interfaces/interfaces.module';
import { CacheModule } from '@common/infrastructure/cache/cache.module';

@Module({
  imports: [CommonInterfacesModule, CacheModule]
})
export class CommonModule {}
