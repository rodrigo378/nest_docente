import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsDate } from 'class-validator';

export class CreatePeriodoDto {
  @IsInt()
  @IsNotEmpty()
  n_codper: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  f_cierre: Date;
}
