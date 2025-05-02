import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class MarcarEntradaDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  docente_id: number;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  aula_id: number;
}
