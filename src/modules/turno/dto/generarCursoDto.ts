import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GenerarCursoDto {
  @Type(() => Number)
  @IsInt()
  id_planCurso: number;

  @Type(() => Number)
  @IsInt()
  turno_id: number;

  @Type(() => Number)
  @IsInt()
  c_alu: number;
}
