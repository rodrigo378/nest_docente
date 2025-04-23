import { Type } from 'class-transformer';
import { IsOptional, IsIn, IsInt, IsString } from 'class-validator';

export class UpdateTurnoDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  n_codper?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  n_codpla?: number;

  @IsString()
  @IsOptional()
  c_codfac?: string;

  @IsString()
  @IsOptional()
  nom_fac?: string;

  @IsString()
  @IsOptional()
  c_codesp?: string;

  @IsString()
  @IsOptional()
  nomesp?: string;

  @IsString()
  @IsOptional()
  c_grpcur?: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  c_codmod?: number;

  @IsString()
  @IsOptional()
  c_nommod?: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  n_ciclo?: number;

  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1, 2], { message: 'El estado debe ser 0, 1 o 2' })
  @IsOptional()
  estado?: number;
}
