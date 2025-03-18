import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UbicacionModule } from './ubicacion/ubicacion.module';
import { DocenteModule } from './docente/docente.module';
import { ExcelService } from './excel/excel.service';
import { ExcelController } from './excel/excel.controller';
import { PrismaService } from './prisma/prisma.service';
import { EspecialidadesController } from './especialidades/especialidades.controller';
import { EspecialidadesService } from './especialidades/especialidades.service';
import { Consultasdb2Service } from './consultasdb2/consultasdb2.service';
import { Consultasdb2Controller } from './consultasdb2/consultasdb2.controller';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UbicacionModule,
    DocenteModule,
  ],
  controllers: [ExcelController, EspecialidadesController, Consultasdb2Controller],
  providers: [ExcelService, EspecialidadesService, Consultasdb2Service],
})
export class AppModule {}
