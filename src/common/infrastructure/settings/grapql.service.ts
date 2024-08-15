import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';

@Injectable()
export class GraphQLService implements GqlOptionsFactory {
  constructor() {}
  createGqlOptions() {
    return {
      autoSchemaFile: true,
      graphiql: {
        enabled: true,
        plugins: []
      },
      ide: true,
      federationMetadata: true,
      allowBatchedQueries: true
    };
  }
}
