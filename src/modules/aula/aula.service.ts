import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AulaService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAulas(
    horario: boolean = false,
    curso: boolean = false,
    docente: boolean = false,
  ) {
    const include: { Horario: any } = { Horario: false };
    console.log('getAulas con seccion');

    if (horario) {
      include.Horario = {
        orderBy: { id: 'desc' },
        distinct: ['dia', 'h_inicio', 'h_fin'],
        select: {
          id: true,
          dia: true,
          h_inicio: true,
          h_fin: true,
          n_horas: true,
          tipo: true,
          curso: curso
            ? { include: { cursosPadres: true, turno: true } }
            : false,
          Docente: docente ? true : false,
        },
      };
    }

    return await this.prismaService.aula.findMany({
      include,
    });
  }

  async getAulaIp(ip: string) {
    return this.prismaService.aula.findFirst({ where: { ip } });
  }

  async getDocentesAula(aula_id: number, dia: string) {
    const docentes = await this.prismaService.docente.findMany({
      where: {
        Horario: {
          some: {
            aula_id,
            dia,
          },
        },
      },
    });

    return docentes;
  }
}
