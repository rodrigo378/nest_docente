import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

type Payload = {
  sub: string;
  email: string;
};

@Injectable()
export class StrategyService extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(), // ✅ para Postman u otros clientes REST
        (req: Request): string | null => {
          const token = req.cookies?.token as string | undefined;
          return token ?? null;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET') || 'supersecreto',
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: payload.email,
        OR: [
          { password: { not: null } },
          { googleId: { not: null } },
          { microsoftId: { not: null } },
        ],
      },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontroado');
    }

    Reflect.deleteProperty(user, 'password');
    return user;
  }
}
