import {
  Injectable,
  ConflictException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signupDto';
import { SigninDto } from './dto/signinDto';
import { AuthProvider } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { createLog } from 'src/common/utils/log.util';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly JwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  //se agrego log
  async signup(user_id: number, signupDto: SignupDto) {
    const {
      email,
      password,
      googleId,
      microsoftId,
      nombre,
      apellido,
      genero,
      grado,
      estado,
    } = signupDto;

    // Verificar si ya existe un usuario con este correo
    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Este email ya está en uso');
    }

    // Definir el proveedor de autenticación
    let authProvider: AuthProvider = AuthProvider.LOCAL;
    if (googleId) authProvider = AuthProvider.GOOGLE;
    if (microsoftId) authProvider = AuthProvider.MICROSOFT;

    // Si usa login propio, la contraseña es obligatoria
    let hashedPassword: string | null = null;
    if (authProvider === AuthProvider.LOCAL) {
      if (!password) {
        throw new BadRequestException(
          'La contraseña es obligatoria para el login propio',
        );
      }
      hashedPassword = await argon2.hash(password);
    }

    // Crear el nuevo usuario
    const newUser = await this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        googleId,
        microsoftId,
        authProvider,
        nombre,
        apellido,
        genero,
        grado,
        estado,
      },
    });

    // Retornar el usuario sin la contraseña
    Reflect.deleteProperty(newUser, 'password');

    await createLog(
      this.prismaService,
      user_id,
      'user',
      'CREATE',
      'Se creo user',
      null,
      {},
      newUser,
    );

    return { message: 'Usuario registrado correctamente', user: newUser };
  }

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user || !user.password)
      throw new UnauthorizedException('Email p password incorrecto');

    const match = await argon2.verify(user.password, password);

    if (!match) throw new UnauthorizedException('Email p password incorrecto');

    const payload = { sub: user.id, email: user.email };

    const token = this.JwtService.sign(payload, {
      expiresIn: '1d',
      secret: this.configService.get('JWT_SECRET') || '',
    });

    return { token, user: { ...user, password: undefined } };
  }
}
