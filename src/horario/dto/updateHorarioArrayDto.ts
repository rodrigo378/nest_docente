import {
  IsString,
  IsDateString,
  IsHexColor,
  IsOptional,
  IsInt,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class HorarioDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id?: number;

  @IsString()
  @IsNotEmpty()
  n_codper: string;

  @IsString()
  @IsNotEmpty()
  c_codcur: string;

  @IsString()
  @IsNotEmpty()
  c_nomcur: string;

  @IsString()
  @IsNotEmpty()
  dia: string;

  @IsDateString()
  @IsNotEmpty()
  h_inicio: string;

  @IsDateString()
  @IsNotEmpty()
  h_fin: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  n_horas: number;

  @IsHexColor()
  @IsNotEmpty()
  c_color: string;

  @IsString()
  @IsOptional()
  n_codper_equ: string;

  @IsString()
  @IsOptional()
  c_codmod_equ: string;

  @IsString()
  @IsOptional()
  c_codfac_equ: string;

  @IsString()
  @IsOptional()
  c_codesp_equ: string;

  @IsString()
  @IsOptional()
  c_codcur_equ: string;

  @IsString()
  @IsOptional()
  c_nomcur_equ: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  turno_id: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  aula_id: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  docente_id: number;
}

export class UpdateHorarioArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HorarioDto)
  horarios: HorarioDto[];
}
