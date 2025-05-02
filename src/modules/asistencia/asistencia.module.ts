import { Module } from '@nestjs/common';
import { AsistenciaController } from './asistencia.controller';
import { AsistenciaService } from './asistencia.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AsistenciaController],
  providers: [AsistenciaService],
})
export class AsistenciaModule {}
