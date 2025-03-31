import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHorarioArrayDto } from './dto/createHorarioArrayDto';
import { DeleteHorarioArrayDto } from './dto/deleteHorarioArrayDto';
import { UpdateHorarioArrayDto } from './dto/updateHorarioArrayDto';

@Injectable()
export class HorarioService {
  constructor(private readonly prismaService: PrismaService) {}

  async createHorarioArray(createHorarioArray: CreateHorarioArrayDto) {
    const { dataArray } = createHorarioArray;

    let cursosCreados = 0;
    let horariosCreados = 0;

    for (const data of dataArray) {
      const { curso, horarios } = data;

      // Buscar si el curso ya existe
      const cursoExistente = await this.prismaService.curso.findFirst({
        where: {
          n_codper: curso.n_codper,
          c_codfac: curso.c_codfac,
          c_codesp: curso.c_codesp,
          c_codcur: curso.c_codcur,
          n_ciclo: curso.n_ciclo,
          turno_id: curso.turno_id,
        },
      });

      let cursoCreado = cursoExistente;

      // Si no existe, lo creamos
      if (!cursoExistente) {
        cursoCreado = await this.prismaService.curso.create({
          data: {
            n_codper: curso.n_codper,
            c_codmod: curso.c_codmod,
            c_codfac: curso.c_codfac,
            c_codesp: curso.c_codesp,
            c_codcur: curso.c_codcur,
            c_nomcur: curso.c_nomcur,
            n_ciclo: curso.n_ciclo,
            c_area: curso.c_area,
            turno_id: curso.turno_id,
            n_codper_equ: curso.n_codper_equ || null,
            c_codmod_equ: curso.c_codmod_equ || null,
            c_codfac_equ: curso.c_codfac_equ || null,
            c_codesp_equ: curso.c_codesp_equ || null,
            c_codcur_equ: curso.c_codcur_equ || null,
            c_nomcur_equ: curso.c_nomcur_equ || null,
          },
        });

        cursosCreados++;
      }

      // Crear los horarios asociados al curso
      for (const horario of horarios) {
        await this.prismaService.horario.create({
          data: {
            dia: horario.dia,
            h_inicio: horario.h_inicio,
            h_fin: horario.h_fin,
            n_horas: horario.n_horas,
            c_color: horario.c_color,
            turno_id: horario.turno_id,
            curso_id: cursoCreado?.id || 0,
            aula_id: horario.aula_id || null,
            docente_id: horario.docente_id || null,
          },
        });

        horariosCreados++;
      }
    }

    return {
      mensaje: '✅ Cursos y horarios procesados correctamente',
      cursos_nuevos: cursosCreados,
      horarios_creados: horariosCreados,
    };
  }

  async deleteHorarioArray(deleteHorarioArray: DeleteHorarioArrayDto) {
    const eliminados: number[] = [];
    const errores: number[] = [];

    for (const horario_id of deleteHorarioArray.horarios_id) {
      try {
        await this.prismaService.horario.delete({
          where: { id: horario_id },
        });
        eliminados.push(horario_id);
      } catch (error) {
        console.warn(`No se pudo eliminar el horario ${horario_id}:`, error);
        errores.push(horario_id);
      }
    }

    return {
      eliminados,
      errores,
      message: 'Proceso de eliminación finalizado.',
    };
  }

  async updateHorarioArray(updateHorarioArrayDto: UpdateHorarioArrayDto) {
    const { dataArray } = updateHorarioArrayDto;

    let cursosCreados = 0;
    let horariosCreados = 0;
    let horariosActualizados = 0;

    for (const { curso, horarios } of dataArray) {
      let cursoExistente = await this.prismaService.curso.findFirst({
        where: {
          n_codper: curso.n_codper,
          c_codfac: curso.c_codfac,
          c_codesp: curso.c_codesp,
          c_codcur: curso.c_codcur,
          n_ciclo: curso.n_ciclo,
          turno_id: curso.turno_id,
        },
      });

      if (!cursoExistente) {
        cursoExistente = await this.prismaService.curso.create({
          data: {
            n_codper: curso.n_codper,
            c_codmod: curso.c_codmod,
            c_codfac: curso.c_codfac,
            c_codesp: curso.c_codesp,
            c_codcur: curso.c_codcur,
            c_nomcur: curso.c_nomcur,
            n_ciclo: curso.n_ciclo,
            c_area: curso.c_area,
            turno_id: curso.turno_id,
            n_codper_equ: curso.n_codper_equ,
            c_codmod_equ: curso.c_codmod_equ,
            c_codfac_equ: curso.c_codfac_equ,
            c_codesp_equ: curso.c_codesp_equ,
            c_codcur_equ: curso.c_codcur_equ,
            c_nomcur_equ: curso.c_nomcur_equ,
          },
        });
        cursosCreados++;
      }

      for (const horario of horarios) {
        if (horario.id) {
          const existe = await this.prismaService.horario.findUnique({
            where: { id: horario.id },
          });

          if (existe) {
            await this.prismaService.horario.update({
              where: { id: horario.id },
              data: {
                dia: horario.dia,
                h_inicio: new Date(horario.h_inicio || ''),
                h_fin: new Date(horario.h_fin || ''),
                n_horas: horario.n_horas,
                c_color: horario.c_color,
                aula_id: horario.aula_id ?? null,
                docente_id: horario.docente_id ?? null,
              },
            });
            horariosActualizados++;
            continue;
          }
        }

        await this.prismaService.horario.create({
          data: {
            dia: horario.dia || '',
            h_inicio: new Date(horario.h_inicio || ''),
            h_fin: new Date(horario.h_fin || ''),
            n_horas: horario.n_horas || 0,
            c_color: horario.c_color || '',
            turno_id: curso.turno_id,
            aula_id: horario.aula_id ?? null,
            docente_id: horario.docente_id ?? null,
            curso_id: cursoExistente.id,
          },
        });

        horariosCreados++;
      }
    }

    return {
      mensaje: '✅ Cursos y horarios procesados correctamente',
      cursos_nuevos: cursosCreados,
      horarios_creados: horariosCreados,
      horarios_actualizados: horariosActualizados,
    };
  }

  async getHorariosTurno(turno_id: number) {
    return await this.prismaService.horario.findMany({
      where: { turno_id },
      include: { curso: true },
    });
  }

  async getHorario(id: number) {
    const horario = await this.prismaService.horario.findUnique({
      where: { id },
    });

    if (horario) {
      throw new NotFoundException('No se encontro el horario con ese id');
    }

    return horario;
  }

  // async getHorarios(
  // c_codmod?: string,
  // n_codper?: number,
  // c_codfac?: string,
  // c_codesp?: string,
  // n_codpla?: number,
  // ) {
  //   const horarios = await this.prismaService.horario.findMany({
  //     where: {
  //       turno: {
  // ...(c_codmod && { c_codmod }),
  // ...(n_codper && { n_codper }),
  // ...(c_codfac && { c_codfac }),
  // ...(c_codesp && { c_codesp }),
  // ...(n_codpla && { n_codpla }),
  //       },
  //     },
  //     include: { turno: true, hijos: true, Docente: true },
  //   });
  //   return horarios;
  // }

  async getCursos(
    c_codmod?: number,
    n_codper?: string,
    c_codfac?: string,
    c_codesp?: string,
    c_codcur?: string,
  ) {
    return await this.prismaService.curso.findMany({
      where: {
        ...(c_codmod && { c_codmod }),
        ...(n_codper && { n_codper }),
        ...(c_codfac && { c_codfac }),
        ...(c_codesp && { c_codesp }),
        ...(c_codcur && { c_codcur }),
      },
      include: { Horario: true },
    });
  }
}

// parseHora(hora: Date | string): Date {
//   const date = new Date(hora);
//   return new Date(1970, 0, 1, date.getHours(), date.getMinutes(), 0, 0);
// }

// async verificarCruze(createHorarioArrayDto: CreateHorarioArrayDto) {
//   const errores: string[] = [];
//   const horarios = createHorarioArrayDto.horarios;

//   // 🔹 1. Conflictos dentro del mismo body
//   for (let i = 0; i < horarios.length; i++) {
//     const h1 = horarios[i];
//     const inicio1 = this.parseHora(h1.h_inicio);
//     const fin1 = this.parseHora(h1.h_fin);

//     for (let j = i + 1; j < horarios.length; j++) {
//       const h2 = horarios[j];

//       if (h1.dia !== h2.dia) continue;

//       const inicio2 = this.parseHora(h2.h_inicio);
//       const fin2 = this.parseHora(h2.h_fin);

//       const cruceHoras = inicio1 < fin2 && fin1 > inicio2;

//       // Solo comparar si ambos tienen aula/docente definidos
//       const mismoAula = h1.aula_id && h2.aula_id && h1.aula_id === h2.aula_id;
//       const mismoDocente =
//         h1.docente_id && h2.docente_id && h1.docente_id === h2.docente_id;

//       if (cruceHoras && (mismoAula || mismoDocente)) {
//         errores.push(
//           `⛔ Conflicto entre "${h1.c_nomcur}" y "${h2.c_nomcur}" el día ${h1.dia} ` +
//             `(${mismoAula ? 'en la misma aula' : ''}${mismoAula && mismoDocente ? ' y ' : ''}${mismoDocente ? 'con el mismo docente' : ''})`,
//         );
//       }
//     }
//   }

//   // 🔹 2. Conflictos con la base de datos
//   for (const h of horarios) {
//     const inicio1 = this.parseHora(h.h_inicio);
//     const fin1 = this.parseHora(h.h_fin);

//     // Construir condiciones OR dinámicamente
//     const condicionesOR: any[] = [];
//     if (h.aula_id) condicionesOR.push({ aula_id: h.aula_id });
//     if (h.docente_id) condicionesOR.push({ docente_id: h.docente_id });

//     if (condicionesOR.length === 0) continue;

//     const horariosBd = await this.prismaService.horario.findMany({
//       where: {
//         dia: h.dia,
//         OR: condicionesOR,
//       },
//     });

//     for (const hb of horariosBd) {
//       const inicio2 = this.parseHora(hb.h_inicio);
//       const fin2 = this.parseHora(hb.h_fin);

//       const cruceHoras = inicio1 < fin2 && fin1 > inicio2;

//       const mismoAula = h.aula_id && hb.aula_id && h.aula_id === hb.aula_id;
//       const mismoDocente =
//         h.docente_id && hb.docente_id && h.docente_id === hb.docente_id;

//       if (cruceHoras && (mismoAula || mismoDocente)) {
//         const mismoTurno = h.turno_id === hb.turno_id;

//         errores.push(
//           `⛔ Conflicto con "${hb.c_nomcur}" (turno ${hb.turno_id}) el día ${h.dia} ` +
//             `(${mismoAula ? 'misma aula' : ''}${mismoAula && mismoDocente ? ' y ' : ''}${mismoDocente ? 'mismo docente' : ''})` +
//             `${!mismoTurno ? ' ⚠️ en diferente turno' : ''}`,
//         );
//       }
//     }
//   }

//   return {
//     success: errores.length === 0,
//     errores,
//   };
// }

// async asociarHorarioTransversal(
//   asignarCursoTransversalDto: AsignarCursoTransversalDto,
// ) {
//   const { padre_id, hijo_id } = asignarCursoTransversalDto;

//   const padre = await this.prismaService.horario.findUnique({
//     where: { id: padre_id },
//   });

//   const hijo = await this.prismaService.horario.findUnique({
//     where: { id: hijo_id },
//   });

//   if (!padre || !hijo) {
//     throw new NotFoundException('Horario padre o hijo no encontrado');
//   }

//   const actualizado = await this.prismaService.horario.update({
//     where: { id: hijo_id },
//     data: {
//       horario_padre_id: padre_id,
//       h_inicio: padre.h_inicio,
//       h_fin: padre.h_fin,
//       aula_id: padre.aula_id,
//       docente_id: padre.docente_id,
//     },
//   });

//   return {
//     mensaje: '✅ Horario asociado como transversal correctamente',
//     hijo: actualizado,
//   };
// }
