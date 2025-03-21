import { IsNotEmpty, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTurnoDto {
  @Type(() => Number)
  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @IsIn([0, 1, 2], { message: 'El estado debe ser 0, 1 o 2' })
  estado: number;
}
