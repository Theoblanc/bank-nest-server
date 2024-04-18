import { IEvent } from '@nestjs/cqrs';
import { UserProperties } from '@/user/domain/user.model';

export class UserRegisteredEvent implements IEvent {
  constructor(readonly user: UserProperties) {}
}
