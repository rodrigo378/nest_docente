import {
  IsString,
  IsDateString,
  IsHexColor,
  IsNotEmpty,
  IsInt,
  IsArray,
  ValidateNested,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class HorarioUpdateDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id?: number;

  @IsOptional()
  @IsString()
  dia?: string;

  @IsOptional()
  @IsDateString()
  h_inicio?: string;

  @IsOptional()
  @IsDateString()
  h_fin?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
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
  c_codesp: string;

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

  @IsOptional()
  @IsString()
  c_codmod_equ?: string;

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
