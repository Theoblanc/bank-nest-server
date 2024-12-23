import { UserRole } from '@/user/domain/user.model';
import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

registerEnumType(UserRole, {
  name: 'UserRole',
  description: '유저 권한'
});

@InputType()
export class RegisterUserInputDTO {
  @Field(() => String, { description: 'user email' })
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @Field(() => String, { description: 'user name' })
  @IsString()
  name: string;

  @Field(() => UserRole, { description: 'user type ex: Business' })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
