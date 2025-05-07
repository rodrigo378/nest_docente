// src/dto/get-datos.dto.ts
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class periodoDto {
  @IsNotEmpty()
  @IsNumberString()
  n_codper: string;
}
