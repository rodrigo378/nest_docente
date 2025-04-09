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
    const include: {
      Horario: { include: { Docente: boolean; curso: boolean } } | boolean;
    } = { Horario: false };

    if (horario) {
      include.Horario = { include: { Docente: false, curso: false } };

      if (curso || docente) {
        include.Horario.include = { Docente: false, curso: false };

        if (curso) {
          include.Horario.include.curso = true;
        }

        if (docente) {
          include.Horario.include.Docente = true;
        }
      } else {
        include.Horario = true;
      }
    }

    return await this.prismaService.aula.findMany({
      include,
    });
  }
}
