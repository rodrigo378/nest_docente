import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { SiguModule } from './modules/sigu/sigu.module';
import { AulaModule } from './modules/aula/aula.module';
import { TurnoModule } from './modules/turno/turno.module';
import { AdminModule } from './modules/admin/admin.module';
import { HorarioModule } from './modules/horario/horario.module';
import { PeriodoModule } from './modules/periodo/periodo.module';
import { DocenteModule } from './modules/docente/docente.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    DocenteModule,
    TurnoModule,
    SiguModule,
    HorarioModule,
    AulaModule,
    AdminModule,
    UserModule,
    DashboardModule,
    PeriodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
