import {
  IsString,
  IsDateString,
  IsHexColor,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class HorarioDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsDateString()
  start: string;

  @IsDateString()
  end: string;

  @IsHexColor()
  color: string;

  @IsString()
  teacher?: string;

  @IsString()
  ciclo: string;

  @IsString()
  seccion: string;

  @IsString()
  carrera: string;
}

export class CreateHorarioDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HorarioDto)
  horarios: HorarioDto[];
}
