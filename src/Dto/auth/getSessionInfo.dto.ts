import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class GetSessionInfoDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @Type(() => Number)
  id: number;
  @ApiProperty({ example: '123321@example.com' })
  @IsString()
  email: string;
  @ApiProperty({ example: 0 })
  @IsNumber()
  iat: number;
  @ApiProperty({ example: 0 })
  @IsNumber()
  exp: number;
}
