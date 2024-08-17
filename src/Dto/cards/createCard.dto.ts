import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  userId: number;
  @ApiProperty({ example: 'name' })
  @IsString()
  name: string;
}
