import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateCursoPlanDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  n_codper: number;

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
  n_ciclo: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  n_ht: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  n_hp: number;

  @IsOptional()
  @IsString()
  c_area: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  c_curup: number;
}
