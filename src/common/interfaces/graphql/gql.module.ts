import { GraphQLService } from '@/common/infrastructure/settings/grapql.service';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver } from '@nestjs/mercurius';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: MercuriusDriver,
      useClass: GraphQLService,
    }),
  ],
})
export class GqlModule {}
