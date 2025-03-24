import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTurnoDto } from './dto/updateTurnoDto';
import { CreateHorarioDto } from './dto/createHorarioDto';
import { UpsertManyHorarioDto } from './dto/updateHorarioDto';
import { CreateTurnoDto } from './dto/createTurnoDto';
import { VerificarAulaDto } from './dto/verificarAulaDto';
import { Horario } from '@prisma/client';

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

  async getTurno(id: number) {
    const turno = await this.prismaService.turno.findFirst({
      where: { id },
    });

    if (!turno) {
      throw new NotFoundException('Este turno no existe');
    }
    return turno;
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

  async createTurno(createTurnoDto: CreateTurnoDto) {
    try {
      const newTurno = await this.prismaService.turno.create({
        data: {
          ...createTurnoDto,
        },
      });

      return {
        success: true,
        mensaje: '✅ Turno creado correctamente',
        turno: newTurno,
      };
    } catch (error) {
      console.error('❌ Error al crear el turno:', error);
      throw new InternalServerErrorException('Error al crear el turno');
    }
  }

  async deleteTurno(id: number) {
    try {
      const turnoExistente = await this.prismaService.turno.findUnique({
        where: { id },
      });

      if (!turnoExistente) {
        throw new NotFoundException('⚠️ Este turno no existe');
      }
      await this.prismaService.turno.delete({
        where: { id },
      });

      return {
        success: true,
        mensaje: '✅ Turno eliminado correctamente',
      };
    } catch (error) {
      console.error('Error al eliminar el horario:', error);
      throw new InternalServerErrorException('❌ Error al eliminar el horario');
    }
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
          n_horas,
          c_color,
          c_coddoc,
          c_nomdoc,
          turno_id,
          aula_id,
        } = horario;

        await this.prismaService.horario.create({
          data: {
            c_codcur,
            c_nomcur,
            dia,
            h_inicio: new Date(h_inicio),
            h_fin: new Date(h_fin),
            n_horas,
            c_color,
            c_coddoc: c_coddoc || null,
            c_nomdoc: c_nomdoc || null,
            turno_id,
            aula_id,
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

  async updateHorario(dto: UpsertManyHorarioDto) {
    const resultados: { tipo: string; horario: any }[] = [];

    for (const horario of dto.horarios) {
      const {
        id,
        c_codcur,
        c_nomcur,
        dia,
        h_inicio,
        h_fin,
        n_horas,
        c_color,
        c_coddoc,
        c_nomdoc,
        turno_id,
        aula_id,
      } = horario;

      if (id) {
        // 🔁 Si tiene ID: intentar actualizar
        const existe = await this.prismaService.horario.findUnique({
          where: { id },
        });

        if (existe) {
          const actualizado = await this.prismaService.horario.update({
            where: { id },
            data: {
              c_codcur,
              c_nomcur,
              dia,
              h_inicio,
              h_fin,
              n_horas,
              c_color,
              c_coddoc,
              c_nomdoc,
              turno_id,
            },
          });
          resultados.push({ tipo: 'actualizado', horario: actualizado });
          continue;
        }
      }

      // ➕ Si no tiene ID o no existe: crear nuevo
      const creado = await this.prismaService.horario.create({
        data: {
          c_codcur,
          c_nomcur,
          dia,
          h_inicio,
          h_fin,
          n_horas,
          c_color,
          c_coddoc,
          c_nomdoc,
          turno_id,
          aula_id,
        },
      });
      resultados.push({ tipo: 'creado', horario: creado });
    }

    return {
      success: true,
      mensaje: '✔️ Horarios procesados correctamente',
      resultados,
    };
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

  parseHora = (hora: string): Date => {
    const [h, m] = hora.split(':').map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d;
  };

  async verificarAula(verificarAulaDto: VerificarAulaDto) {
    const { aula_id, dia, h_inicio, h_fin } = verificarAulaDto;

    const horarios = await this.prismaService.horario.findMany({
      where: { aula_id, dia },
    });

    const conflictos: { mensaje: string; horario: Horario }[] = [];

    for (const horario of horarios) {
      const horaInicio = horario.h_inicio.toLocaleTimeString('es-PE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC',
      });

      const horaFin = horario.h_fin.toLocaleTimeString('es-PE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC',
      });

      const inicioNuevo = this.parseHora(h_inicio);
      const finNuevo = this.parseHora(h_fin);
      const inicioExistente = this.parseHora(horaInicio);
      const finExistente = this.parseHora(horaFin);

      if (inicioNuevo < finExistente && finNuevo > inicioExistente) {
        conflictos.push({
          mensaje: `⛔ Conflicto con el curso "${horario.c_nomcur}" del docente "${horario.c_nomdoc || 'Sin asignar'}" (${horaInicio} - ${horaFin})`,
          horario,
        });
      }
    }

    if (conflictos.length > 0) {
      return {
        success: false,
        conflicto: true,
        mensaje: `❌ Se encontraron ${conflictos.length} conflictos de horario.`,
        conflictos,
      };
    }

    return {
      success: true,
      conflicto: false,
      mensaje: '✅ El aula está disponible en ese horario.',
    };
  }
}

// a1   a2
// 8:00 a 10:00
// b1   b2
// 9:30 a 12:30
// a1 < b2 and a2 > b1
// 8:00 < 12:30 and 10:00 > 9:30

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

// tb_cur_grp_hor
// id_horario
// n_codper
// c_codfac
// c_codcur
// c_grpcur
// c_dnidoc
// n_numdia
// c_hh_ini
// c_min_ini
// c_hh_fin
// c_mi_fin
// n_break =>  0
// c_codadm => null
// d_freg => falta
// c_codmod
// c_tipo => TEO TEV PRP LBP => falta
// id_aula
// c_codesp
// n_codpla => 2025
// c_sedcod => 1

// tb_doc_cur_grp
//c_dnidoc
//n_codper
//c_codmod
//c_codfac
//c_codcur
//c_grpcur
//c_tipo => falta
//c_categoria
//c_codesp
//n_codpla
//c_sedcod => 1
//c_tema => null
//n_monto_doc => null
//horas => null

//
//
/*
 */

// EC	ESPECIALIDAD
// EF	ESPECIFICA
// FG	FORMACIÓN GENERAL
// PP	PRÁCTICAS PRE-PROFESIONALES
