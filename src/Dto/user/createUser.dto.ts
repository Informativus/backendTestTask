import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsOptional()
  @IsString()
  middleName?: string;
  @IsEmail()
  email: string;
  @IsString()
  hash: string;
  @IsString()
  salt: string;
}
