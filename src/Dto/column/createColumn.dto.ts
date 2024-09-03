import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateColumnDto {
  @ApiProperty({ example: 1 })
  @IsString()
  email: string;
  @ApiProperty({ example: 'name' })
  @IsString()
  name: string;
}
