import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthProvider } from '@prisma/client';
import { Strategy } from 'passport-google-oauth20'; // ✅ CORRECTO
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {
    super({
      clientID:
        configService.get<string>('GOOGLE_CLIENT_ID') || 'MISSING_CLIENT_ID',
      clientSecret:
        configService.get<string>('GOOGLE_CLIENT_SECRET') ||
        'MISSING_CLIENT_SECRET',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: { emails: { value: string }[]; id: string },
  ): Promise<any> {
    const { emails, id } = profile;
    const email = emails[0].value;

    let user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) {
      user = await this.prismaService.user.create({
        data: {
          email,
          googleId: id,
          authProvider: AuthProvider.GOOGLE,
        },
      });
    }

    const token = this.jwtService.sign({ userId: user.id, email: user.email });

    return { user, accessToken: token };
  }
}
