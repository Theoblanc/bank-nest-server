import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'path';

@Injectable()
export class GraphQLService implements GqlOptionsFactory {
  constructor() {}
  createGqlOptions() {
    return { autoSchemaFile: { path: join(process.cwd(), 'schema.gql') } };
  }
}
