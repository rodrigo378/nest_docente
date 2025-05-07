import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateDocenteDto {
  @IsString()
  @IsNotEmpty()
  c_dnidoc: string;

  @IsString()
  @IsNotEmpty()
  c_codfac: string;

  @IsString()
  @IsNotEmpty()
  nom_fac: string;

  @IsString()
  @IsNotEmpty()
  c_nomdoc: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  h_min: number;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  h_max: number;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  tipo: number;
}
