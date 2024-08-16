import { IsArray, IsString } from 'class-validator';

export class RelationDbDto {
  @IsString()
  text: string;
  @IsArray()
  values: any[];
}
