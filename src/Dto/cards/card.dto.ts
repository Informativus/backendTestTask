import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CardDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;
  @ApiProperty({ example: 'name' })
  @IsString()
  name: string;
}
