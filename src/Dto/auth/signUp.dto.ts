import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ example: 'Ivan' })
  @Length(1, 64)
  @IsString()
  firstName: string;
  @ApiProperty({ example: 'Ivanov' })
  @Length(1, 64)
  @IsString()
  lastName: string;
  @ApiProperty({ example: 'Ivanovich' })
  @Length(1, 64)
  @IsString()
  middleName: string;
  @ApiProperty({ example: '123321@example.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: '123321' })
  @IsString()
  password: string;
}
