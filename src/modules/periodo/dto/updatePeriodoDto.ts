import { Type } from 'class-transformer';
import { IsNotEmpty, IsDate } from 'class-validator';

export class UpdatePeriodoDto {
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  f_cierre: Date;
}
