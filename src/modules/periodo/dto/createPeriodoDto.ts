import { IsInt, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePeriodoDto {
  @IsInt()
  @IsNotEmpty()
  n_codper: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  f_cierre: Date;
}
