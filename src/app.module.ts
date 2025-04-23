import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { DocenteModule } from './modules/docente/docente.module';
import { TurnoModule } from './modules/turno/turno.module';
import { SiguModule } from './modules/sigu/sigu.module';
import { HorarioModule } from './modules/horario/horario.module';
import { AulaModule } from './modules/aula/aula.module';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { PeriodoModule } from './periodo/periodo.module';

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
