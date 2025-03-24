import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateHorarioDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  n_codper: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  n_codpla: string;

  @IsString()
  @IsNotEmpty()
  c_codfac: string;

  @IsString()
  @IsNotEmpty()
  nom_fac: string;

  @IsString()
  @IsNotEmpty()
  c_codesp: string;

  @IsString()
  @IsNotEmpty()
  nomesp: string;

  @IsString()
  @IsNotEmpty()
  c_grpcur: number;

  @IsString()
  @IsNotEmpty()
  c_codmod: string;

  @IsString()
  @IsNotEmpty()
  c_nommod?: string;

  @IsOptional()
  @IsString()
  c_nomdoc?: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  n_ciclo: number;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  estado: number;
}
