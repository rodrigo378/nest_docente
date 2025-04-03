import { IsNotEmpty, IsInt, IsArray, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTransversalDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  tipo: number; // 0 => transversal, 1=> agrupado

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
