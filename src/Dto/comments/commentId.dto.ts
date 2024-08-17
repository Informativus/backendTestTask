import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CommentIdDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @Type(() => Number)
  id: number;
}
