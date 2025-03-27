import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTurnoDto } from './dto/updateTurnoDto';
import { CreateHorarioDto } from './dto/createHorarioDto';
import { CreateTurnoDto } from './dto/createTurnoDto';
import { updateHorarioDto } from './dto/updateHorarioDto';
import { AsignarCursoTransversalDto } from './dto/asignarCursoTransversal';

@Injectable()
export class TurnoService {
  constructor(private readonly prismaService: PrismaService) {}

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

  async getTurnos(
    c_codfac?: string,
    c_codesp?: string,
    c_codmod?: string,
    n_codper?: number,
    n_codpla?: number,
    estado?: number,
  ) {
    try {
      return await this.prismaService.turno.findMany({
        where: {
          ...(c_codfac && { c_codfac }),
          ...(c_codesp && { c_codesp }),
          ...(c_codmod && { c_codmod }),
          ...(n_codper && { n_codper }),
          ...(n_codpla && { n_codpla }),
          ...(estado && { estado }),
        },
        // include: { Horario: true },
      });
    } catch (error) {
      console.error('❌ Error =>', error);
      throw new InternalServerErrorException(
        '❌ Error al procesar la solicitud',
      );
    }
  }

  async getTurno(id: number) {
    try {
      const turno = await this.prismaService.turno.findFirst({
        where: { id },
      });

      if (!turno) {
        throw new NotFoundException('Este turno no existe');
      }
      return turno;
    } catch (error) {
      console.error('❌ Error =>', error);
      throw new InternalServerErrorException(
        '❌ Error al procesar la solicitud',
      );
    }
  }

  async updateTurno(id: number, updateTurnoDto: UpdateTurnoDto) {
    try {
      const turno = await this.prismaService.turno.findFirst({ where: { id } });

      if (!turno) {
        throw new NotFoundException('Este turno no existe');
      }

      const newTurno = await this.prismaService.turno.update({
        where: { id },
        data: { ...updateTurnoDto },
      });

      return newTurno;
    } catch (error) {
      console.error('❌ Error =>', error);
      throw new InternalServerErrorException(
        '❌ Error al procesar la solicitud',
      );
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

  //Horarios=======================================================================
  parseHora(hora: Date | string): Date {
    const date = new Date(hora);
    return new Date(1970, 0, 1, date.getHours(), date.getMinutes(), 0, 0);
  }

  async verificarCruze(createHorarioDto: CreateHorarioDto) {
    const errores: string[] = [];
    const horarios = createHorarioDto.horarios;

    // 🔹 1. Conflictos dentro del mismo body
    for (let i = 0; i < horarios.length; i++) {
      const h1 = horarios[i];
      const inicio1 = this.parseHora(h1.h_inicio);
      const fin1 = this.parseHora(h1.h_fin);

      for (let j = i + 1; j < horarios.length; j++) {
        const h2 = horarios[j];
        if (h1.dia !== h2.dia) continue;

        const inicio2 = this.parseHora(h2.h_inicio);
        const fin2 = this.parseHora(h2.h_fin);

        const cruceHoras = inicio1 < fin2 && fin1 > inicio2;
        const mismoAula = h1.aula_id === h2.aula_id;
        const mismoDocente = h1.docente_id === h2.docente_id;

        if (cruceHoras && (mismoAula || mismoDocente)) {
          errores.push(
            `⛔ Conflicto entre "${h1.c_nomcur}" y "${h2.c_nomcur}" el día ${h1.dia} ` +
              `(${mismoAula ? 'en la misma aula' : ''}${mismoAula && mismoDocente ? ' y ' : ''}${mismoDocente ? 'con el mismo docente' : ''})`,
          );
        }
      }
    }

    // 🔹 2. Conflictos con base de datos (todos los turnos)
    for (const h of horarios) {
      const inicio1 = this.parseHora(h.h_inicio);
      const fin1 = this.parseHora(h.h_fin);

      const horariosBd = await this.prismaService.horario.findMany({
        where: {
          dia: h.dia,
          OR: [{ aula_id: h.aula_id }, { docente_id: h.docente_id }],
        },
      });

      for (const hb of horariosBd) {
        const inicio2 = this.parseHora(hb.h_inicio);
        const fin2 = this.parseHora(hb.h_fin);

        const cruceHoras = inicio1 < fin2 && fin1 > inicio2;
        const mismoAula = h.aula_id === hb.aula_id;
        const mismoDocente = h.docente_id === hb.docente_id;

        if (cruceHoras && (mismoAula || mismoDocente)) {
          const mismoTurno = h.turno_id === hb.turno_id;
          errores.push(
            `⛔ Conflicto con "${hb.c_nomcur}" (turno ${hb.turno_id}) el día ${h.dia} ` +
              `(${mismoAula ? 'misma aula' : ''}${mismoAula && mismoDocente ? ' y ' : ''}${mismoDocente ? 'mismo docente' : ''})` +
              `${!mismoTurno ? ' ⚠️ en diferente turno' : ''}`,
          );
        }
      }
    }

    return {
      success: errores.length === 0,
      errores,
    };
  }

  async createHorario(createHorarioDto: CreateHorarioDto) {
    const resultado = await this.verificarCruze(createHorarioDto);

    if (!resultado.success) {
      throw new BadRequestException({
        message: '❌ No se puede registrar los horarios debido a conflictos',
        errores: resultado.errores,
      });
    }

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
          turno_id,
          aula_id,
          docente_id,
          n_codper,
        } = horario;

        await this.prismaService.horario.create({
          data: {
            n_codper,
            c_codcur,
            c_nomcur,
            dia,
            h_inicio: new Date(h_inicio),
            h_fin: new Date(h_fin),
            n_horas,
            c_color,
            turno_id,
            aula_id,
            docente_id,
          },
        });
      }

      return {
        message: '✅ Horarios creados con éxito',
        cantidad: createHorarioDto.horarios.length,
      };
    } catch (error) {
      console.error('❌ Error al crear horarios:', error);
      throw new InternalServerErrorException('Error al crear los horarios');
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

  async getHorarios(
    c_codmod?: string,
    n_codper?: number,
    c_codfac?: string,
    c_codesp?: string,
    n_codpla?: number,
  ) {
    try {
      const horarios = await this.prismaService.horario.findMany({
        where: {
          turno: {
            ...(c_codmod && { c_codmod }),
            ...(n_codper && { n_codper }),
            ...(c_codfac && { c_codfac }),
            ...(c_codesp && { c_codesp }),
            ...(n_codpla && { n_codpla }),
          },
        },
        include: { turno: true, hijos: true },
      });
      return horarios;
    } catch (error) {
      console.error('❌ Error =>', error);
      throw new InternalServerErrorException(
        '❌ Error al procesar la solicitud',
      );
    }
  }

  async updateHorario(updateHorarioDto: updateHorarioDto) {
    try {
      const resultados: { tipo: string; horario: any }[] = [];

      for (const horario of updateHorarioDto.horarios) {
        const {
          id,
          c_codcur,
          c_nomcur,
          dia,
          h_inicio,
          h_fin,
          n_horas,
          c_color,
          turno_id,
          aula_id,
          docente_id,
          n_codper,
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
                n_codper,
                c_codcur,
                c_nomcur,
                dia,
                h_inicio,
                h_fin,
                n_horas,
                c_color,
                turno_id,
                aula_id,
                docente_id,
              },
            });
            resultados.push({ tipo: 'actualizado', horario: actualizado });
            continue;
          }
        }

        // ➕ Si no tiene ID o no existe: crear nuevo
        const creado = await this.prismaService.horario.create({
          data: {
            n_codper,
            c_codcur,
            c_nomcur,
            dia,
            h_inicio,
            h_fin,
            n_horas,
            c_color,
            turno_id,
            aula_id,
            docente_id,
          },
        });
        resultados.push({ tipo: 'creado', horario: creado });
      }

      return {
        mensaje: '✔️ Horarios procesados correctamente',
        resultados,
      };
    } catch (error) {
      console.error('❌ Error =>', error);
      throw new InternalServerErrorException(
        '❌ Error al procesar la solicitud',
      );
    }
  }

  async deleteHorario(id: number) {
    try {
      const horarioExistente = await this.prismaService.horario.findUnique({
        where: { id },
      });

      if (!horarioExistente) {
        throw new NotFoundException('⚠️ Este horario no existe');
      }

      await this.prismaService.horario.delete({
        where: { id },
      });

      return {
        mensaje: '✅ Horario eliminado correctamente',
      };
    } catch (error) {
      console.error('Error al eliminar el horario:', error);
      throw new InternalServerErrorException('❌ Error al eliminar el horario');
    }
  }

  async asociarHorarioTransversal(
    asignarCursoTransversalDto: AsignarCursoTransversalDto,
  ) {
    try {
      const { padre_id, hijo_id } = asignarCursoTransversalDto;

      const padre = await this.prismaService.horario.findUnique({
        where: { id: padre_id },
      });
      const hijo = await this.prismaService.horario.findUnique({
        where: { id: hijo_id },
      });

      if (!padre || !hijo) {
        throw new NotFoundException('Horario padre o hijo no encontrado');
      }

      const mismoDocente = padre.docente_id === hijo.docente_id;
      const mismaAula = padre.aula_id === hijo.aula_id;
      const mismaHoraInicio =
        this.parseHora(padre.h_inicio).getTime() ===
        this.parseHora(hijo.h_inicio).getTime();
      const mismaHoraFin =
        this.parseHora(padre.h_fin).getTime() ===
        this.parseHora(hijo.h_fin).getTime();

      if (!mismoDocente || !mismaAula || !mismaHoraInicio || !mismaHoraFin) {
        throw new BadRequestException(
          `${
            !mismoDocente
              ? 'No se puede asignar este curso transversal con docentes distintos. '
              : ''
          }${
            !mismaAula
              ? 'No se puede asignar este curso transversal con aulas distintas. '
              : ''
          }${
            !mismaHoraInicio || !mismaHoraFin
              ? 'Los horarios deben coincidir exactamente en hora de inicio y fin.'
              : ''
          }`,
        );
      }

      const actualizado = await this.prismaService.horario.update({
        where: { id: hijo_id },
        data: {
          horario_padre_id: padre_id,
        },
      });

      return {
        mensaje: '✅ Horario asociado como transversal correctamente',
        hijo: actualizado,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error al asociar horario transversal',
      );
    }
  }

  //aula==========================================================================
  async getAulas() {
    try {
      return await this.prismaService.aula.findMany();
    } catch (error) {
      console.error('Error en el servidor:', error);
      throw new InternalServerErrorException('❌ Error en el servidor');
    }
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

// EC	ESPECIALIDAD => netamente de carrera
// EF	ESPECIFICA => semainarios
// FG	FORMACIÓN GENERAL => generales
// PP	PRÁCTICAS PRE-PROFESIONALES => practicas

//get docente
// aulas

// primero los cursos deben estar creadoos minimo 2

// luego escoger uno de los 2 como padre y asignarle el curso hijo

//
