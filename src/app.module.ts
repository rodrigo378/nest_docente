import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UbicacionModule } from './ubicacion/ubicacion.module';
import { DocenteModule } from './docente/docente.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UbicacionModule,
    DocenteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
