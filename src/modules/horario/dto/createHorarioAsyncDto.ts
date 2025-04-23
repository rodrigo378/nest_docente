import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CursoDto {
  @IsInt()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  n_codper: string;

  @IsInt()
  @Type(() => Number)
  c_codmod: number;

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
  c_codcur: string;

  @IsString()
  @IsNotEmpty()
  c_nomcur: string;

  @IsInt()
  @Type(() => Number)
  n_ciclo: number;

  @IsString()
  @IsNotEmpty()
  c_area: string;

  @IsInt()
  @Type(() => Number)
  turno_id: number;

  //equivalentes
  @IsString()
  @IsOptional()
  n_codper_equ?: string;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  c_codmod_equ?: number;

  @IsString()
  @IsOptional()
  c_codfac_equ?: string;

  @IsString()
  @IsOptional()
  c_codesp_equ?: string;

  @IsString()
  @IsOptional()
  c_codcur_equ?: string;

  @IsString()
  @IsOptional()
  c_nomcur_equ?: string;
}

export class HorarioAsyncDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  n_horas: number;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  turno_id: number;
}

export class CreateHorarioAsyncDto {
  @ValidateNested()
  @Type(() => CursoDto)
  curso: CursoDto;

  @ValidateNested()
  @Type(() => HorarioAsyncDto)
  horario: HorarioAsyncDto;
}
