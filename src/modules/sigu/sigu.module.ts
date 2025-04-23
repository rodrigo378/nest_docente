import { Module } from '@nestjs/common';
import { SiguService } from './sigu.service';
import { SiguController } from './sigu.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SiguController],
  providers: [SiguService],
})
export class SiguModule {}
