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

export class CreateHorarioDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HorarioDto)
  horarios: HorarioDto[];
}
