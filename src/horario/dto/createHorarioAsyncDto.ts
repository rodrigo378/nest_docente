import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateHorarioAsyncDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  n_horas: number;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  curso_id: number;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  turno_id: number;
}
