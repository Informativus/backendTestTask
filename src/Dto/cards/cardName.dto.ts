import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CardNameDto {
  @ApiProperty({ example: 'name' })
  @IsString()
  name: string;
}
