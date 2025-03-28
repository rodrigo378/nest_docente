import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UbicacionModule } from './ubicacion/ubicacion.module';
import { DocenteModule } from './docente/docente.module';
import { TurnoModule } from './turno/turno.module';
import { SiguModule } from './sigu/sigu.module';
import { HorarioModule } from './horario/horario.module';
import { AulaModule } from './aula/aula.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UbicacionModule,
    DocenteModule,
    TurnoModule,
    SiguModule,
    HorarioModule,
    AulaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
