import { Module } from '@nestjs/common';
import { CommonInterfacesModule } from './interfaces/interfaces.module';

@Module({
  imports: [CommonInterfacesModule],
})
export class CommonModule {}
