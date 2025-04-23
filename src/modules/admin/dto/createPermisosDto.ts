import { Type } from 'class-transformer';
import {
  IsInt,
  IsArray,
  IsNumber,
  IsNotEmpty,
  ArrayNotEmpty,
} from 'class-validator';

export class CreatePermisosDto {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  user_id: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  items_id: number[];
}
