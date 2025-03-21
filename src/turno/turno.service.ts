import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTurnoDto } from './dto/updateTurnoDto';
import { CreateHorarioDto } from './dto/createHorarioDto';

@Injectable()
export class TurnoService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTurnos(
    c_codfac?: string,
    c_codesp?: string,
    c_codmod?: string,
    n_ciclo?: number,
    estado?: number,
  ) {
    return await this.prismaService.turno.findMany({
      where: {
        ...(c_codfac && { c_codfac }),
        ...(c_codesp && { c_codesp }),
        ...(c_codmod && { c_codmod }),
        ...(n_ciclo && { n_ciclo }),
        ...(estado && { estado }),
      },
    });
  }

  async updateTurno(id: number, updateTurnoDto: UpdateTurnoDto) {
    const turno = await this.prismaService.turno.findFirst({ where: { id } });

    if (!turno) {
      throw new NotFoundException('Este turno no existe');
    }

    const newTurno = await this.prismaService.turno.update({
      where: { id },
      data: { estado: updateTurnoDto.estado },
    });

    return newTurno;
  }

  //Horarios
  async createHorario(createHorarioDto: CreateHorarioDto) {
    try {
      for (const horario of createHorarioDto.horarios) {
        const {
          c_codcur,
          c_nomcur,
          dia,
          h_inicio,
          h_fin,
          c_color,
          c_coddoc,
          c_nomdoc,
          turno_id,
        } = horario;

        await this.prismaService.horario.create({
          data: {
            c_codcur,
            c_nomcur,
            dia,
            h_inicio: new Date(h_inicio),
            h_fin: new Date(h_fin),
            c_color,
            c_coddoc: c_coddoc || null,
            c_nomdoc: c_nomdoc || null,
            turno_id,
          },
        });
      }

      return {
        message: '✅ Horarios creados con éxito',
        cantidad: createHorarioDto.horarios.length,
      };
    } catch (error) {
      console.error('❌ Error al crear horarios:', error);
      throw new Error('Error al crear los horarios');
    }
  }

  async getHorario(turno_id: number) {
    const horarios = await this.prismaService.horario.findMany({
      where: { turno_id: turno_id },
    });
    if (!horarios) {
      throw new NotFoundException('Este turno_id no existe');
    }
    return horarios;
  }
}

// GENERAR TURNO
// SELECT
// 	a.n_codper,
//     a.n_codpla,
// 	b.c_codfac,
//     c.nom_fac,
//     b.c_codesp,
//     d.nomesp,
//     a.c_grpcur,
//     a.c_codmod,
//     e.c_nommod,
//     b.n_ciclo
// FROM tb_curso_grupo a
// INNER JOIN tb_plan_estudio_curso b
//     ON a.c_codcur = b.c_codcur
//     AND a.c_codmod = b.c_codmod
//     AND a.c_codfac = b.c_codfac
//     AND a.c_codesp = b.c_codesp
//     AND a.n_codpla = b.n_codper
// INNER JOIN tb_facultad c
//     ON a.c_codfac = c.cod_fac
// INNER JOIN tb_especialidad d
//     ON a.c_codesp = d.codesp
//     AND a.c_codfac = d.codfac
// INNER JOIN tb_modalidad e
//     ON a.c_codmod = e.c_codmod
// WHERE a.n_codper = 20251 -- and n_ciclo = 1
// AND a.c_codfac IN ('E', 'S')
// GROUP BY
// a.n_codper,
// a.n_codpla,
// b.c_codfac,
// c.nom_fac,
// b.c_codesp,
// d.nomesp,
// a.c_grpcur,
// a.c_codmod,
// e.c_nommod,
// b.n_ciclo;
