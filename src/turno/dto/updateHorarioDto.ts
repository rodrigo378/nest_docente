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

export class UpsertHorarioDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id?: number;

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
}

export class UpsertManyHorarioDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpsertHorarioDto)
  horarios: UpsertHorarioDto[];
}
