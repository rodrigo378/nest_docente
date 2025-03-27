import {
  BadRequestException,
  Injectable,
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
  }

  async getTurnos(
    c_codfac?: string,
    c_codesp?: string,
    c_codmod?: string,
    n_codper?: number,
    n_codpla?: number,
    estado?: number,
  ) {
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
      data: { ...updateTurnoDto },
    });

    return newTurno;
  }

  async deleteTurno(id: number) {
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

      // Validar solo si viene aula_id
      if (
        aula_id &&
        !(await this.prismaService.aula.findUnique({ where: { id: aula_id } }))
      ) {
        throw new NotFoundException('Esta aula no existe');
      }

      // Validar solo si viene docente_id
      if (
        docente_id &&
        !(await this.prismaService.docente.findUnique({
          where: { id: docente_id },
        }))
      ) {
        throw new NotFoundException('Este docente no existe');
      }

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
          aula_id: aula_id ?? null,
          docente_id: docente_id ?? null,
        },
      });
    }

    return {
      message: '✅ Horarios creados con éxito',
      cantidad: createHorarioDto.horarios.length,
    };
  }

  // async createHorarioMasa(createHorarioMasaDto: CreateHorarioMasaDto) {
  //   for (const horario of createHorarioMasaDto.turnos_id) {
  //     console.log(horario);
  //     const newHora
  //   }
  // }

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
      include: { turno: true, hijos: true, Docente: true },
    });
    return horarios;
  }

  async updateHorario(updateHorarioDto: updateHorarioDto) {
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
  }

  async deleteHorario(id: number) {
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
  }

  async asociarHorarioTransversal(
    asignarCursoTransversalDto: AsignarCursoTransversalDto,
  ) {
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

    const actualizado = await this.prismaService.horario.update({
      where: { id: hijo_id },
      data: {
        horario_padre_id: padre_id,
        h_inicio: padre.h_inicio,
        h_fin: padre.h_fin,
        aula_id: padre.aula_id,
        docente_id: padre.docente_id,
      },
    });

    return {
      mensaje: '✅ Horario asociado como transversal correctamente',
      hijo: actualizado,
    };
  }

  //aula==========================================================================
  async getAulas() {
    return await this.prismaService.aula.findMany();
  }
}

//plan facultad especialidad ciclo modalidad

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
