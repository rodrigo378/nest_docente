import { Module } from '@nestjs/common';
import { DocenteService } from './docente.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DocenteController } from './docente.controller';

@Module({
  imports: [PrismaModule],
  controllers: [DocenteController],
  providers: [DocenteService],
})
export class DocenteModule {}
