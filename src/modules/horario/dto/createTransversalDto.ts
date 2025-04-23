import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateTransversalDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  padre_id: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty()
  @Type(() => Number)
  hijos_id: number[];
}
