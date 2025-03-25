import { IsNotEmpty, IsString } from 'class-validator';

export class GetCursoDto {
  @IsNotEmpty({ message: 'El c_codfac es obligatorio' })
  @IsString()
  c_codfac: string;

  @IsNotEmpty({ message: 'El c_codesp es obligatorio' })
  @IsString()
  c_codesp: string;

  @IsNotEmpty({ message: 'El n_ciclo es obligatorio' })
  @IsString()
  n_ciclo: string;

  @IsNotEmpty({ message: 'El n_ciclo es obligatorio' })
  @IsString()
  c_codmod: string;
}
