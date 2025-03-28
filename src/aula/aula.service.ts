import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AulaService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAulas() {
    return await this.prismaService.aula.findMany();
  }
}
