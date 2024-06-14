import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { GRAPHQL_PATH } from '@common/infrastructure/settings/constants';

@Injectable()
export class GraphQLService implements GqlOptionsFactory {
  constructor() {}
  createGqlOptions() {
    return {
      path: GRAPHQL_PATH,
      autoSchemaFile: true,
      graphiql: {
        enabled: true,
        plugins: []
      },
      ide: true
    };
  }
}
