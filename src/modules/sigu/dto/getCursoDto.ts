import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class GetCursoDto {
  @IsNotEmpty({ message: 'El c_codfac es obligatorio' })
  @IsString()
  c_codfac: string;

  @IsNotEmpty({ message: 'El c_codesp es obligatorio' })
  @IsString()
  c_codesp: string;

  @IsNotEmpty({ message: 'El n_ciclo es obligatorio' })
  @IsInt()
  @Type(() => Number)
  n_ciclo: number;

  @IsNotEmpty({ message: 'El c_codmod es obligatorio' })
  @IsInt()
  c_codmod: number;

  @IsNotEmpty({ message: 'El c_grpcur es obligatorio' })
  @IsString()
  c_grpcur: string;
}
