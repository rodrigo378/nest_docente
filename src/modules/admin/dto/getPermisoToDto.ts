import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GetPermisoToDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
