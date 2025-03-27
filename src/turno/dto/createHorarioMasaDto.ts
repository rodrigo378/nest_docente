import { IsArray, ArrayNotEmpty, IsInt, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateHorarioMasaDto {
  @IsArray({ message: 'El campo turnos_id debe ser un arreglo' })
  @ArrayNotEmpty({ message: 'El arreglo turnos_id no puede estar vacío' })
  @ArrayMinSize(1, { message: 'Debe contener al menos un turno' })
  @Type(() => Number)
  @IsInt({ each: true, message: 'Cada turno_id debe ser un número entero' })
  turnos_id: number[];
}
