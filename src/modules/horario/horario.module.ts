import { Module } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HorarioController } from './horario.controller';

@Module({
  imports: [PrismaModule],
  providers: [HorarioService],
  controllers: [HorarioController],
})
export class HorarioModule {}
