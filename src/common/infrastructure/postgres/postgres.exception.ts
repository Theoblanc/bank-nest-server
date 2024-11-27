import {
  BadRequestException,
  InternalServerErrorException
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';

export class PostgresException {
  error(error, id?: string) {
    switch (error.constructor) {
      case EntityNotFoundError:
        throw new BadRequestException(
          `No document found with the id: '${id}'`,
          error.messge
        );
      default:
        throw new InternalServerErrorException(error.message);
    }
  }
}
