import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDocenteDto {
  @IsString()
  @IsNotEmpty()
  sds: string;
}
