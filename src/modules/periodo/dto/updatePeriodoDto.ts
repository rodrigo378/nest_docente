import { IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePeriodoDto {
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  f_cierre: Date;
}
