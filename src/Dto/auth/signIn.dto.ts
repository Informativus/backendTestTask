import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: '123321@example.com' })
  @IsString()
  email: string;
  @ApiProperty({ example: '123321' })
  @IsString()
  password: string;
}
