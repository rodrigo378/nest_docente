import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

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
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET', ''),
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

    const { password, ...result } = user;
    return result;
  }
}
