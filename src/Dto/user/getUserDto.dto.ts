import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsOptional()
  @IsString()
  middleName?: string;
  @IsNumber()
  id: number;
  @IsEmail()
  email: string;
  @IsString()
  hash: string;
  @IsString()
  salt: string;
}
