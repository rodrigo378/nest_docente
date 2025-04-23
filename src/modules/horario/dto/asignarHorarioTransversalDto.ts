import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt } from 'class-validator';

export class AsignarCursoTransversalDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  padre_id: number;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  hijo_id: number;
}
