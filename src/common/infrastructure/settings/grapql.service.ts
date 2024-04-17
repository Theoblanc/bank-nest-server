import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'path';
import { GRAPHQL_PATH } from '@common/infrastructure/settings/constants';

@Injectable()
export class GraphQLService implements GqlOptionsFactory {
  constructor() {}
  createGqlOptions() {
    return {
      path: GRAPHQL_PATH,
      autoSchemaFile: {
        path: join(process.cwd(), 'schema.gql')
      },
      graphiql: false,
      ide: true
    };
  }
}
