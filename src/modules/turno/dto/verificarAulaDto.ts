import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class VerificarAulaDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  aula_id: number;

  @IsString()
  @IsNotEmpty()
  dia: string;

  @IsString()
  @IsNotEmpty()
  h_inicio: string;

  @IsString()
  @IsNotEmpty()
  h_fin: string;
}
