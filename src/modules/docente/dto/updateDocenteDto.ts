import {
  IsInt,
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

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
