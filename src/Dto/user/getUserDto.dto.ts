import { IsOptional, IsString } from 'class-validator';

export class GetUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsOptional()
  @IsString()
  middleName?: string;
  @IsString()
  email: string;
  @IsString()
  hash: string;
  @IsString()
  salt: string;
}
