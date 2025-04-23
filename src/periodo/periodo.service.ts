import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PeriodoService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPeriodo() {
    return await this.prismaService.periodo.findMany();
  }
}
