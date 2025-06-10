import {
  IsInt,
  IsArray,
  IsString,
  IsBoolean,
  IsHexColor,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  ValidateNested,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum Modalidad {
  'PRESENCIAL' = 'pre',
  'VIRTUAL' = 'vir',
  'TEORIA VIRTUAL' = 'tev',
  'LABORATORIO PRESENCIAL' = 'lbp',
  'TEORIA PRESENCIAL' = 'tep',
  'LABORATORIO' = 'lab',
}

export class HorarioUpdateDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id?: number;

  @IsOptional()
  @IsString()
  dia?: string;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsDateString()
  h_inicio?: string;

  @IsOptional()
  @IsDateString()
  h_fin?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  n_horas?: number;

  @IsOptional()
  @IsHexColor()
  c_color?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  aula_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  docente_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  turno_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  h_umaPlus?: number;

  @IsEnum(Modalidad)
  modalidad: Modalidad;
}

export class CursoUpdateDto {
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

  // Equivalentes opcionales
  @IsOptional()
  @IsString()
  n_codper_equ?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  c_codmod_equ?: number;

  @IsOptional()
  @IsString()
  c_codfac_equ?: string;

  @IsOptional()
  @IsString()
  c_codesp_equ?: string;

  @IsOptional()
  @IsString()
  c_codcur_equ?: string;

  @IsOptional()
  @IsString()
  c_nomcur_equ?: string;
}

export class UpdateCursoHorarioDto {
  @ValidateNested()
  @Type(() => CursoUpdateDto)
  curso: CursoUpdateDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HorarioUpdateDto)
  horarios: HorarioUpdateDto[];
}

export class UpdateHorarioArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateCursoHorarioDto)
  dataArray: UpdateCursoHorarioDto[];

  @IsBoolean()
  verificar: boolean;
}

// inicio1 =>  1970-01-09T23:00:00.000Z
// inicio2 =>  1970-01-09T23:00:00.000Z
// fin1 =>  1970-01-10T00:40:00.000Z
// fin2 =>  1970-01-10T00:40:00.000Z

//  inicio1 =>  1970-01-09T23:00:00.000Z
// 0|api-docentes  | inicio2 =>  1970-01-09T23:00:00.000Z
// 0|api-docentes  | fin1 =>  1970-01-09T23:50:00.000Z
// 0|api-docentes  | fin2 =>  1970-01-09T00:40:00.000Z
