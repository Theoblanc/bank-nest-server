import { Mutation } from '@nestjs/graphql';

export class AccountResolver {
  @Mutation(() => String, { nullable: true })
  async registerAccount() {
    
  }
}
