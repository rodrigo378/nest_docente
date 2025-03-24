import {
  IsString,
  IsDateString,
  IsHexColor,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class HorarioDto {
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

  @IsOptional()
  @IsString()
  c_coddoc?: string;

  @IsOptional()
  @IsString()
  c_nomdoc?: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  turno_id: number;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  aula_id: number;
}

export class CreateHorarioDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HorarioDto)
  horarios: HorarioDto[];
}
