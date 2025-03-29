import { IsNotEmpty, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

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
