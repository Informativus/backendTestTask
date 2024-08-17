import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCommentsDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  cardId: number;
  @ApiProperty({ example: 'name' })
  @IsString()
  name: string;
}
