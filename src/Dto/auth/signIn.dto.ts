import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: '123321@example.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: '123321' })
  @IsString()
  password: string;
}
