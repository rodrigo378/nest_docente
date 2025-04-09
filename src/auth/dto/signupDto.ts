import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class SignupDto {
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  @IsEmail({}, { message: 'El correo no es válido' })
  readonly email: string;

  @IsOptional() // No obligatorio si usa Google o Microsoft
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  readonly password?: string;

  @IsOptional() // Solo se usará si el usuario se registra con Google
  readonly googleId?: string;

  @IsOptional() // Solo se usará si el usuario se registra con Microsoft
  readonly microsoftId?: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsString()
  @IsNotEmpty()
  genero: string;

  @IsString()
  @IsNotEmpty()
  grado: string;

  @IsString()
  @IsNotEmpty()
  estado: string;
}
