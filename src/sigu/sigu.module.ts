import { Module } from '@nestjs/common';
import { SiguController } from './sigu.controller';
import { SiguService } from './sigu.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SiguController],
  providers: [SiguService],
})
export class SiguModule {}
