import {
  IsString,
  IsDateString,
  IsHexColor,
  IsNotEmpty,
  IsInt,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class HorarioDto {
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
  @IsNotEmpty()
  docente_id: number;
}

export class CursoDto {
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

  //equivalentes
  @IsString()
  @IsNotEmpty()
  n_codper_equ: string;

  @IsString()
  @IsNotEmpty()
  c_codmod_equ: string;

  @IsString()
  @IsNotEmpty()
  c_codfac_equ: string;

  @IsString()
  @IsNotEmpty()
  c_codesp_equ: string;

  @IsString()
  @IsNotEmpty()
  c_codcur_equ: string;

  @IsString()
  @IsNotEmpty()
  c_nomcur_equ: string;
}

export class CreateCursoHorarioDto {
  @ValidateNested()
  @Type(() => CursoDto)
  curso: CursoDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HorarioDto)
  horarios: HorarioDto[];
}

export class CreateHorarioArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCursoHorarioDto)
  dataArray: CreateCursoHorarioDto[];
}
