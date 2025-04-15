import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsInt,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class UpdateDocenteDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsOptional()
  @IsString()
  c_codfac?: string;

  @IsOptional()
  @IsString()
  nom_fac?: string;

  @IsOptional()
  @IsString()
  c_nomdoc?: string;

  @IsOptional()
  @IsInt()
  h_min?: number;

  @IsOptional()
  @IsInt()
  h_max?: number;

  @IsOptional()
  @IsInt()
  tipo?: number;

  @IsOptional()
  @IsNumber()
  h_total?: number;
}
