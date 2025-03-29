import { IsArray, ArrayNotEmpty, IsInt, ArrayUnique } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteHorarioArrayDto {
  @IsArray()
  @ArrayNotEmpty({ message: 'El array de horarios no puede estar vacío.' })
  @ArrayUnique({ message: 'No se permiten IDs de horarios duplicados.' })
  @Type(() => Number)
  @IsInt({ each: true, message: 'Todos los IDs deben ser enteros.' })
  horarios_id: number[];
}
