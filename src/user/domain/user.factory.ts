import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
  User,
  UserEssentialProperties,
  UserImplement,
  UserProperties
} from '@/user/domain/user.model';

export class UserFactory {
  constructor(
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher
  ) {}

  create(properties: UserEssentialProperties): User {
    return this.eventPublisher.mergeObjectContext(
      new UserImplement(properties)
    );
  }

  reconstitute(properties: UserProperties): User {
    return this.eventPublisher.mergeObjectContext(
      new UserImplement(properties)
    );
  }
}
