import {
  IsString,
  IsDateString,
  IsHexColor,
  IsArray,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class HorarioDto {
  @IsString()
  @IsNotEmpty()
  curso: string;

  @IsString()
  @IsNotEmpty()
  dia: string;

  @IsDateString()
  @IsNotEmpty()
  h_inicio: string;

  @IsDateString()
  @IsNotEmpty()
  h_fin: string;

  @IsHexColor()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  docente: string;

  @IsString()
  @IsNotEmpty()
  ciclo: string;

  @IsString()
  @IsNotEmpty()
  seccion: string;

  @IsString()
  @IsNotEmpty()
  carrera: string;
}

export class CreateHorarioDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HorarioDto)
  @IsNotEmpty()
  horarios: HorarioDto[];
}
