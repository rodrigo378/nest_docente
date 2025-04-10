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
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    UbicacionModule,
    DocenteModule,
    TurnoModule,
    SiguModule,
    HorarioModule,
    AulaModule,
    AdminModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
