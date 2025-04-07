import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AulaService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAulas(horario: boolean = false) {
    const include: { Horario: boolean } = {
      Horario: false,
    };

    if (horario) {
      include.Horario = true;
    }

    return await this.prismaService.aula.findMany({
      include: include,
    });
  }
}
