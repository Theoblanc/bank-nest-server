import { Module } from '@nestjs/common';
import { GqlModule } from '@common/interfaces/graphql/gql.module';

@Module({
  imports: [GqlModule]
})
export class CommonInterfacesModule {}
