import { Type } from 'class-transformer';
import { IsInt, IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateDocenteDto {
  @IsOptional()
  @IsString()
  c_dnidoc?: string;

  @IsOptional()
  @IsString()
  c_nomdoc?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  h_min?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  h_max?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  tipo?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  h_total?: number;
}
