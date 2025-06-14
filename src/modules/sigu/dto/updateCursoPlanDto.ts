import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateCursoPlan {
  @IsOptional()
  @IsString()
  n_codper: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  c_codmod: number;

  @IsOptional()
  @IsString()
  c_codfac: string;

  @IsOptional()
  @IsString()
  c_codesp: string;

  @IsOptional()
  @IsString()
  c_codcur: string;

  @IsOptional()
  @IsString()
  c_nomcur: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  n_ciclo: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  n_ht: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  n_hp: string;

  @IsOptional()
  @IsString()
  c_area: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  c_curup: string;
}
