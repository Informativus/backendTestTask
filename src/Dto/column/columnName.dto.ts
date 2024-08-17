import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ColumnNameDto {
  @ApiProperty({ example: 'name' })
  @IsString()
  name: string;
}
