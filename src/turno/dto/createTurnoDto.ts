import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTurnoDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  n_codper: number;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  n_codpla: number;

  @IsString()
  @IsNotEmpty()
  c_codfac: string;

  @IsString()
  @IsNotEmpty()
  nom_fac: string;

  @IsString()
  @IsNotEmpty()
  c_codesp: string;

  @IsString()
  @IsNotEmpty()
  nomesp: string;

  @IsString()
  @IsNotEmpty()
  c_grpcur: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  c_codmod: number;

  @IsString()
  @IsNotEmpty()
  c_nommod: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  n_ciclo: number;

  // @Type(() => Number)
  // @IsInt()
  // @IsNotEmpty()
  // estado: number;
}
