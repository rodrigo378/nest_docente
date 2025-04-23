import { Module } from '@nestjs/common';
import { PeriodoService } from './periodo.service';
import { PeriodoController } from './periodo.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PeriodoService],
  controllers: [PeriodoController],
})
export class PeriodoModule {}
