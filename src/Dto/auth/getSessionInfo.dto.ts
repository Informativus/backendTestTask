import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber } from 'class-validator';

export class GetSessionInfoDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;
  @ApiProperty({ example: '123321@example.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: 0 })
  @IsNumber()
  iat: number;
  @ApiProperty({ example: 0 })
  @IsNumber()
  exp: number;
}
