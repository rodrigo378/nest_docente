import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prismaService: PrismaService) {}

  async dashboard_1() {
    const countCursos = await this.prismaService.curso.count();
    const countDocentes = await this.prismaService.docente.count();

    const aulasUnicas = await this.prismaService.horario.findMany({
      distinct: ['aula_id'],
      select: {
        aula_id: true,
      },
    });

    const countTurnos = await this.prismaService.turno.count();
    const countTurnosAsignados = await this.prismaService.turno.count({
      where: { estado: 2 },
    });

    const porAsignacion = (100 * countTurnosAsignados) / countTurnos;

    const countAulasAsignadas = aulasUnicas.length;

    return {
      countCursos,
      countDocentes,
      countAulasAsignadas,
      porAsignacion,
    };
  }
}
