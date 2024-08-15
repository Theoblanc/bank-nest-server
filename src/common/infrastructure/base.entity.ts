import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { BaseModel } from '../domain/base.model';
import { Field, ID } from '@nestjs/graphql';

export abstract class BaseEntity implements BaseModel {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;

  @Field()
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;
}
