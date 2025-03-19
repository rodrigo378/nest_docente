import {
  IsString,
  IsDateString,
  IsHexColor,
  IsArray,
  ValidateNested,
  IsOptional,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

export class HorarioDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  id?: number;

  @IsString()
  @IsOptional()
  curso?: string;

  @IsDateString()
  @IsOptional()
  h_inicio?: string;

  @IsDateString()
  @IsOptional()
  h_fin?: string;

  @IsHexColor()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  docente?: string;

  @IsString()
  @IsOptional()
  ciclo?: string;

  @IsString()
  @IsOptional()
  seccion?: string;

  @IsString()
  @IsOptional()
  carrera?: string;
}

export class UpdateHorarioDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HorarioDto)
  horarios: HorarioDto[];
}
