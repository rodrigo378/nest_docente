import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCursoPlan {
  @IsNotEmpty()
  @IsString()
  n_codper: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  c_codmod: number;

  @IsNotEmpty()
  @IsString()
  c_codfac: string;

  @IsNotEmpty()
  @IsString()
  c_codesp: string;

  @IsNotEmpty()
  @IsString()
  c_codcur: string;

  @IsNotEmpty()
  @IsString()
  c_nomcur: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  n_ciclo: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  n_ht: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  n_hp: string;

  @IsNotEmpty()
  @IsString()
  c_area: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  c_curup: string;
}
