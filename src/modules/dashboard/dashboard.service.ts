import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prismaService: PrismaService) {}

  async dashboard_1(n_codper: string) {
    const countCursos = await this.prismaService.curso.count({
      where: { n_codper },
    });
    const countDocentes = await this.prismaService.docente.count();

    const aulasUnicas = await this.prismaService.horario.findMany({
      distinct: ['aula_id'],
      select: {
        aula_id: true,
      },
    });

    const countTurnos = await this.prismaService.turno.count({
      where: { n_codper: Number(n_codper) },
    });
    const countTurnosAsignados = await this.prismaService.turno.count({
      where: { estado: 2, n_codper: Number(n_codper) },
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

  async dash_Docente() {
    const docentes = await this.prismaService.docente.findMany({
      select: {
        c_nomdoc: true,
        h_total: true,
      },
      orderBy: { h_total: 'desc' },
      skip: 0,
      take: 10,
    });

    const categories = docentes.map((d) => d.c_nomdoc);
    const docente = categories.map((c) => {
      const array = c.split(' ');
      return `${array[0]} ${array[2]}`;
    });

    const data = docentes.map((d) => d.h_total);

    return { docente, data };
  }

  async dash_TipoCurso(n_codper: string) {
    const countCursos = await this.prismaService.curso.count({});

    const countTransversales = await this.prismaService.grupo_sincro.count({
      where: { tipo: 0, cursosHijo: { turno: { n_codper: Number(n_codper) } } },
    });

    const countAgrupados = await this.prismaService.grupo_sincro.count({
      where: { tipo: 1, cursosHijo: { turno: { n_codper: Number(n_codper) } } },
    });

    return { countCursos, countTransversales, countAgrupados };
  }

  async dash_EstadoTurno(n_codper: string) {
    const countTurnoEstado_0 = await this.prismaService.turno.count({
      where: { estado: 0, n_codper: Number(n_codper) },
    });

    const countTurnoEstado_1 = await this.prismaService.turno.count({
      where: { estado: 1, n_codper: Number(n_codper) },
    });

    const countTurnoEstado_2 = await this.prismaService.turno.count({
      where: { estado: 2, n_codper: Number(n_codper) },
    });

    return { countTurnoEstado_0, countTurnoEstado_1, countTurnoEstado_2 };
  }
}
