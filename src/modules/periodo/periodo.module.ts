import { Module } from '@nestjs/common';
import { PeriodoService } from './periodo.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PeriodoController } from './periodo.controller';

@Module({
  imports: [PrismaModule],
  providers: [PeriodoService],
  controllers: [PeriodoController],
})
export class PeriodoModule {}
