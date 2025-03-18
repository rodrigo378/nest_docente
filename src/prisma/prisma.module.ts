import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaReadonlyService } from './readonly.service';

@Module({
  providers: [PrismaService, PrismaReadonlyService],
  exports: [PrismaService, PrismaReadonlyService],
})
export class PrismaModule {}
