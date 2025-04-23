import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StrategyService } from './strategies/local.strategy';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'MISSING_JWT_SECRET', // ✅ Asegurar que JWT_SECRET no es undefined
        signOptions: { expiresIn: '24h' }, // ✅ Token válido por 1 hora
      }),
    }),
  ],
  providers: [AuthService, StrategyService, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
