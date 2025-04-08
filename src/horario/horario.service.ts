import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateHorarioArrayDto,
  CursoDto,
  HorarioDto,
} from './dto/createHorarioArrayDto';
import { DeleteHorarioArrayDto } from './dto/deleteHorarioArrayDto';
import {
  CursoUpdateDto,
  HorarioUpdateDto,
  UpdateHorarioArrayDto,
} from './dto/updateHorarioArrayDto';
import { CreateTransversalDto } from './dto/createTransversalDto';
import { grupo_sincro } from '@prisma/client';

@Injectable()
export class HorarioService {
  constructor(private readonly prismaService: PrismaService) {}

  parseHora(hora: Date | string): Date {
    const date = new Date(hora);
    return new Date(1970, 0, 1, date.getHours(), date.getMinutes(), 0, 0);
  }

  formatoHora(hora: Date): string {
    const h = hora.getHours().toString().padStart(2, '0');
    const m = hora.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  async verificarCruze(createHorarioArrayDto: CreateHorarioArrayDto) {
    const errores: string[] = [];

    const todosLosHorarios: {
      h: HorarioDto;
      curso: CursoDto;
    }[] = [];

    // 1️⃣ Validar entre todos los cursos y sus horarios enviados
    for (const data of createHorarioArrayDto.dataArray) {
      const { curso, horarios } = data;

      for (let i = 0; i < horarios.length; i++) {
        const h1 = horarios[i];
        const inicio1 = this.parseHora(h1.h_inicio);
        const fin1 = this.parseHora(h1.h_fin);

        // Cruces dentro del mismo curso
        for (let j = i + 1; j < horarios.length; j++) {
          const h2 = horarios[j];
          if (h1.dia !== h2.dia) continue;

          const inicio2 = this.parseHora(h2.h_inicio);
          const fin2 = this.parseHora(h2.h_fin);

          const cruceHoras = inicio1 < fin2 && fin1 > inicio2;
          const mismoAula =
            h1.aula_id && h2.aula_id && h1.aula_id === h2.aula_id;
          const mismoDocente =
            h1.docente_id && h2.docente_id && h1.docente_id === h2.docente_id;

          if (cruceHoras && (mismoAula || mismoDocente)) {
            errores.push(
              `⛔ Conflicto interno en curso "${curso.c_nomcur}" el día ${h1.dia} ` +
                `entre ${this.formatoHora(inicio1)} - ${this.formatoHora(fin1)} y ${this.formatoHora(inicio2)} - ${this.formatoHora(fin2)} ` +
                `(${mismoAula ? 'misma aula' : ''}${mismoAula && mismoDocente ? ' y ' : ''}${mismoDocente ? 'mismo docente' : ''})`,
            );
          }
        }

        todosLosHorarios.push({ h: h1, curso });
      }
    }

    // 2️⃣ Verificación con la base de datos
    for (const { h } of todosLosHorarios) {
      const condicionesOR: any[] = [];
      if (h.aula_id) condicionesOR.push({ aula_id: h.aula_id });
      if (h.docente_id) condicionesOR.push({ docente_id: h.docente_id });

      if (condicionesOR.length === 0) continue;

      const existentes = await this.prismaService.horario.findMany({
        where: {
          dia: h.dia,
          OR: condicionesOR,
        },
        include: { curso: true },
      });

      const inicio1 = this.parseHora(h.h_inicio);
      const fin1 = this.parseHora(h.h_fin);

      for (const e of existentes) {
        const inicio2 = this.parseHora(e.h_inicio);
        const fin2 = this.parseHora(e.h_fin);
        const cruce = inicio1 < fin2 && fin1 > inicio2;

        const mismoAula = h.aula_id && e.aula_id && h.aula_id === e.aula_id;
        const mismoDocente =
          h.docente_id && e.docente_id && h.docente_id === e.docente_id;

        if (cruce && (mismoAula || mismoDocente)) {
          errores.push(
            `⛔ Conflicto con curso "${e.curso?.c_nomcur}" en BD el día ${h.dia} (ID horario: ${e.id}) ` +
              `entre ${this.formatoHora(inicio1)} - ${this.formatoHora(fin1)} y ${this.formatoHora(inicio2)} - ${this.formatoHora(fin2)} ` +
              `(${mismoAula ? 'misma aula' : ''}${mismoAula && mismoDocente ? ' y ' : ''}${mismoDocente ? 'mismo docente' : ''})`,
          );
        }
      }
    }

    return {
      success: errores.length === 0,
      errores,
    };
  }

  async verificarCruzesCursosTransversales(
    cursosAgrupados: grupo_sincro[],
    horarios: HorarioDto[],
  ): Promise<string[]> {
    const errores: string[] = [];

    for (const cursoAgrupado of cursosAgrupados) {
      const curso = await this.prismaService.curso.findUnique({
        where: { id: cursoAgrupado.curso_id },
      });

      if (!curso) continue;

      const turnoHorarios = await this.prismaService.horario.findMany({
        where: { turno_id: curso.turno_id },
        include: { curso: true },
      });

      for (const hNuevo of horarios) {
        const inicioNuevo = this.parseHora(hNuevo.h_inicio);
        const finNuevo = this.parseHora(hNuevo.h_fin);

        for (const hExistente of turnoHorarios) {
          if (hNuevo.dia !== hExistente.dia) continue;

          const inicioExistente = this.parseHora(hExistente.h_inicio);
          const finExistente = this.parseHora(hExistente.h_fin);

          const cruceHoras =
            inicioNuevo < finExistente && finNuevo > inicioExistente;

          if (cruceHoras) {
            errores.push(
              `⛔ Cruce de hora con curso "${hExistente.curso?.c_nomcur}" en turno ${curso.turno_id} el día ${hNuevo.dia}`,
            );
          }
        }
      }
    }

    return errores;
  }

  async createHorarioArray(createHorarioArray: CreateHorarioArrayDto) {
    const verificacion = await this.verificarCruze(createHorarioArray);

    if (!verificacion.success && createHorarioArray.verificar) {
      return {
        success: false,
        errores: verificacion.errores,
      };
    }

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
        include: { cursosPadres: true },
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
            c_codmod_equ: Number(curso.c_codmod_equ) || null,
            c_codfac_equ: curso.c_codfac_equ || null,
            c_codesp_equ: curso.c_codesp_equ || null,
            c_codcur_equ: curso.c_codcur_equ || null,
            c_nomcur_equ: curso.c_nomcur_equ || null,
          },
          include: { cursosPadres: true },
        });

        cursosCreados++;
      } else {
        // Si no existe, lo creamos
        if (
          cursoCreado?.cursosPadres.length !== 0 &&
          cursoCreado?.cursosPadres[0].tipo === 0
        ) {
          const cursosAgrupados =
            await this.prismaService.grupo_sincro.findMany({
              where: {
                padre_curso_id: cursoCreado.cursosPadres[0].padre_curso_id,
              },
              include: {
                cursosHijo: true,
              },
            });

          const errores = await this.verificarCruzesCursosTransversales(
            cursosAgrupados,
            horarios,
          );

          if (errores.length > 0) {
            return {
              success: false,
              errores,
            };
          }

          const idCursos = cursosAgrupados.map((g) => g.curso_id);

          await this.prismaService.horario.deleteMany({
            where: {
              curso_id: { in: idCursos },
            },
          });

          for (const horario of horarios) {
            if (horario.docente_id) {
              await this.prismaService.docente.update({
                where: { id: horario.docente_id },
                data: { h_total: { increment: horario.n_horas } },
              });
            }
          }

          // 4️⃣ Volver a crear los mismos horarios para todos los cursos sincronizados
          for (const grupo of cursosAgrupados) {
            const cursoHijo = grupo.cursosHijo;

            for (const horario of horarios) {
              await this.prismaService.horario.create({
                data: {
                  dia: horario.dia,
                  h_inicio: horario.h_inicio,
                  h_fin: horario.h_fin,
                  n_horas: horario.n_horas,
                  c_color: horario.c_color,
                  tipo: horario.tipo,
                  turno_id: cursoHijo.turno_id,
                  curso_id: cursoHijo.id,
                  aula_id: horario.aula_id || null,
                  docente_id: horario.docente_id || null,
                },
              });

              horariosCreados++;
            }
          }
          continue;
        }
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
            tipo: horario.tipo,
            turno_id: horario.turno_id,
            curso_id: cursoCreado?.id || 0,
            aula_id: horario.aula_id || null,
            docente_id: horario.docente_id || null,
          },
        });

        if (horario.docente_id) {
          await this.prismaService.docente.update({
            where: { id: horario.docente_id },
            data: { h_total: { increment: horario.n_horas } },
          });
        }

        horariosCreados++;
      }
    }

    return {
      mensaje: '✅ Cursos y horarios procesados correctamente',
      cursos_nuevos: cursosCreados,
      horarios_creados: horariosCreados,
    };
  }

  // async verificarCruzeUpdate(updateHorarioArrayDto: UpdateHorarioArrayDto) {
  //   const errores: string[] = [];

  //   const todosLosHorarios: {
  //     h: HorarioUpdateDto;
  //     curso: CursoUpdateDto;
  //   }[] = [];

  //   for (const data of updateHorarioArrayDto.dataArray) {
  //     const { curso, horarios } = data;

  //     for (let i = 0; i < horarios.length; i++) {
  //       const h1 = horarios[i];
  //       const inicio1 = h1.h_inicio ? this.parseHora(h1.h_inicio) : null;
  //       const fin1 = h1.h_fin ? this.parseHora(h1.h_fin) : null;

  //       if (!inicio1 || !fin1) continue;

  //       for (let j = i + 1; j < horarios.length; j++) {
  //         const h2 = horarios[j];
  //         if (h1.dia !== h2.dia) continue;

  //         const inicio2 = h2.h_inicio ? this.parseHora(h2.h_inicio) : null;
  //         const fin2 = h2.h_fin ? this.parseHora(h2.h_fin) : null;

  //         if (!inicio2 || !fin2) continue;

  //         const cruceHoras = inicio1 < fin2 && fin1 > inicio2;
  //         const mismoAula =
  //           h1.aula_id && h2.aula_id && h1.aula_id === h2.aula_id;
  //         const mismoDocente =
  //           h1.docente_id && h2.docente_id && h1.docente_id === h2.docente_id;

  //         if (cruceHoras && (mismoAula || mismoDocente)) {
  //           errores.push(
  //             `⛔ Conflicto interno en curso "${curso.c_nomcur}" el día ${h1.dia}` +
  //               ` (${mismoAula ? 'misma aula' : ''}${mismoAula && mismoDocente ? ' y ' : ''}${mismoDocente ? 'mismo docente' : ''})`,
  //           );
  //         }
  //       }

  //       todosLosHorarios.push({ h: h1, curso });
  //     }
  //   }

  //   // 2️⃣ Verificación con la BD excluyendo los horarios originales si ya existen
  //   for (const { h } of todosLosHorarios) {
  //     const condicionesOR: any[] = [];
  //     if (h.aula_id) condicionesOR.push({ aula_id: h.aula_id });
  //     if (h.docente_id) condicionesOR.push({ docente_id: h.docente_id });

  //     if (condicionesOR.length === 0) continue;

  //     const existentes = await this.prismaService.horario.findMany({
  //       where: {
  //         dia: h.dia,
  //         OR: condicionesOR,
  //         NOT: h.id ? { id: h.id } : undefined,
  //       },
  //       include: { curso: true },
  //     });

  //     const inicio1 = h.h_inicio ? this.parseHora(h.h_inicio) : null;
  //     const fin1 = h.h_fin ? this.parseHora(h.h_fin) : null;

  //     if (!inicio1 || !fin1) continue;

  //     for (const e of existentes) {
  //       const inicio2 = this.parseHora(e.h_inicio);
  //       const fin2 = this.parseHora(e.h_fin);

  //       const cruce = inicio1 < fin2 && fin1 > inicio2;
  //       const mismoAula = h.aula_id && e.aula_id && h.aula_id === e.aula_id;
  //       const mismoDocente =
  //         h.docente_id && e.docente_id && h.docente_id === e.docente_id;

  //       if (cruce && (mismoAula || mismoDocente)) {
  //         errores.push(
  //           `⛔ Conflicto con "${e.curso?.c_nomcur}" en BD el día ${h.dia}` +
  //             ` (${mismoAula ? 'misma aula' : ''}${mismoAula && mismoDocente ? ' y ' : ''}${mismoDocente ? 'mismo docente' : ''})`,
  //         );
  //       }
  //     }
  //   }

  //   return {
  //     success: errores.length === 0,
  //     errores,
  //   };
  // }

  // async updateHorarioArray(updateHorarioArrayDto: UpdateHorarioArrayDto) {
  //   const verificacion = await this.verificarCruzeUpdate(updateHorarioArrayDto);

  //   if (!verificacion.success && updateHorarioArrayDto.verificar) {
  //     return {
  //       success: false,
  //       errores: verificacion.errores,
  //     };
  //   }

  //   const { dataArray } = updateHorarioArrayDto;

  //   let cursosCreados = 0;
  //   let horariosCreados = 0;
  //   let horariosActualizados = 0;

  //   for (const { curso, horarios } of dataArray) {
  //     console.log('curso.n_codper => ', curso.n_codper);
  //     console.log('curso.c_codfac => ', curso.c_codfac);
  //     console.log('curso.c_codesp => ', curso.c_codesp);
  //     console.log('curso.c_codcur => ', curso.c_codcur);
  //     console.log('curso.n_ciclo => ', curso.n_ciclo);
  //     console.log('curso.turno_id => ', curso.turno_id);

  //     let cursoExistente = await this.prismaService.curso.findFirst({
  //       where: {
  //         n_codper: curso.n_codper,
  //         c_codfac: curso.c_codfac,
  //         c_codesp: curso.c_codesp,
  //         c_codcur: curso.c_codcur,
  //         n_ciclo: curso.n_ciclo,
  //         turno_id: curso.turno_id,
  //       },
  //     });
  //     console.log('cursoExistente => ', cursoExistente);

  //     if (!cursoExistente) {
  //       console.log('dentro del if => ', cursoExistente);
  //       cursoExistente = await this.prismaService.curso.create({
  //         data: {
  //           n_codper: curso.n_codper,
  //           c_codmod: curso.c_codmod,
  //           c_codfac: curso.c_codfac,
  //           c_codesp: curso.c_codesp,
  //           c_codcur: curso.c_codcur,
  //           c_nomcur: curso.c_nomcur,
  //           n_ciclo: curso.n_ciclo,
  //           c_area: curso.c_area,
  //           turno_id: curso.turno_id,
  //           n_codper_equ: curso.n_codper_equ,
  //           c_codmod_equ: Number(curso.c_codmod_equ),
  //           c_codfac_equ: curso.c_codfac_equ,
  //           c_codesp_equ: curso.c_codesp_equ,
  //           c_codcur_equ: curso.c_codcur_equ,
  //           c_nomcur_equ: curso.c_nomcur_equ,
  //         },
  //       });
  //       cursosCreados++;
  //     }

  //     for (const horario of horarios) {
  //       if (horario.id) {
  //         const existe = await this.prismaService.horario.findUnique({
  //           where: { id: horario.id },
  //         });

  //         if (existe) {
  //           await this.prismaService.horario.update({
  //             where: { id: horario.id },
  //             data: {
  //               dia: horario.dia,
  //               h_inicio: new Date(horario.h_inicio || ''),
  //               h_fin: new Date(horario.h_fin || ''),
  //               n_horas: horario.n_horas,
  //               c_color: horario.c_color,
  //               tipo: horario.tipo,
  //               aula_id: horario.aula_id ?? null,
  //               docente_id: horario.docente_id ?? null,
  //             },
  //           });
  //           horariosActualizados++;
  //           continue;
  //         }
  //       }

  //       await this.prismaService.horario.create({
  //         data: {
  //           dia: horario.dia || '',
  //           h_inicio: new Date(horario.h_inicio || ''),
  //           h_fin: new Date(horario.h_fin || ''),
  //           n_horas: horario.n_horas || 0,
  //           c_color: horario.c_color || '',
  //           tipo: horario.tipo || '',
  //           turno_id: curso.turno_id,
  //           aula_id: horario.aula_id ?? null,
  //           docente_id: horario.docente_id ?? null,
  //           curso_id: cursoExistente.id,
  //         },
  //       });

  //       horariosCreados++;
  //     }
  //   }

  //   return {
  //     success: true,
  //     mensaje: '✅ Cursos y horarios procesados correctamente',
  //     cursos_nuevos: cursosCreados,
  //     horarios_creados: horariosCreados,
  //     horarios_actualizados: horariosActualizados,
  //   };
  // }

  async verificarCruzeUpdate(updateHorarioArrayDto: UpdateHorarioArrayDto) {
    const errores: string[] = [];

    const todosLosHorarios: {
      h: HorarioUpdateDto;
      curso: CursoUpdateDto;
    }[] = [];

    for (const data of updateHorarioArrayDto.dataArray) {
      const { curso, horarios } = data;

      const cur = await this.prismaService.curso.findFirst({
        where: { c_codcur: curso.c_codcur, turno_id: curso.turno_id },
        include: { cursosPadres: true },
      });

      for (let i = 0; i < horarios.length; i++) {
        const h1 = horarios[i];

        const inicio1 = h1.h_inicio ? this.parseHora(h1.h_inicio) : null;
        const fin1 = h1.h_fin ? this.parseHora(h1.h_fin) : null;

        if (!inicio1 || !fin1) continue;

        for (let j = i + 1; j < horarios.length; j++) {
          const h2 = horarios[j];
          if (h1.dia !== h2.dia) continue;

          const inicio2 = h2.h_inicio ? this.parseHora(h2.h_inicio) : null;
          const fin2 = h2.h_fin ? this.parseHora(h2.h_fin) : null;

          if (!inicio2 || !fin2) continue;

          const cruceHoras = inicio1 < fin2 && fin1 > inicio2;
          const mismoAula =
            h1.aula_id && h2.aula_id && h1.aula_id === h2.aula_id;
          const mismoDocente =
            h1.docente_id && h2.docente_id && h1.docente_id === h2.docente_id;

          if (
            cur?.cursosPadres[0].tipo !== 0 &&
            cruceHoras &&
            (mismoAula || mismoDocente)
          ) {
            errores.push(
              `⛔ Conflicto interno en curso "${curso.c_nomcur}" el día ${h1.dia}` +
                ` (${mismoAula ? 'misma aula' : ''}${mismoAula && mismoDocente ? ' y ' : ''}${mismoDocente ? 'mismo docente' : ''})`,
            );
          }
        }

        todosLosHorarios.push({ h: h1, curso });
      }
    }

    // 2️⃣ Verificación con la BD excluyendo los horarios originales si ya existen
    for (const { h, curso } of todosLosHorarios) {
      const cur = await this.prismaService.curso.findFirst({
        where: { c_codcur: curso.c_codcur, turno_id: curso.turno_id },
        include: { cursosPadres: true },
      });
      const condicionesOR: any[] = [];
      if (h.aula_id) condicionesOR.push({ aula_id: h.aula_id });
      if (h.docente_id) condicionesOR.push({ docente_id: h.docente_id });

      if (condicionesOR.length === 0) continue;

      const existentes = await this.prismaService.horario.findMany({
        where: {
          dia: h.dia,
          OR: condicionesOR,
          NOT: h.id ? { id: h.id } : undefined,
        },
        include: { curso: true },
      });

      const inicio1 = h.h_inicio ? this.parseHora(h.h_inicio) : null;
      const fin1 = h.h_fin ? this.parseHora(h.h_fin) : null;

      if (!inicio1 || !fin1) continue;

      for (const e of existentes) {
        const inicio2 = this.parseHora(e.h_inicio);
        const fin2 = this.parseHora(e.h_fin);

        const cruce = inicio1 < fin2 && fin1 > inicio2;
        const mismoAula = h.aula_id && e.aula_id && h.aula_id === e.aula_id;
        const mismoDocente =
          h.docente_id && e.docente_id && h.docente_id === e.docente_id;

        if (
          cur?.cursosPadres[0].tipo !== 0 &&
          cruce &&
          (mismoAula || mismoDocente)
        ) {
          errores.push(
            `⛔ Conflicto con "${e.curso?.c_nomcur}" en BD el día ${h.dia}` +
              ` (${mismoAula ? 'misma aula' : ''}${mismoAula && mismoDocente ? ' y ' : ''}${mismoDocente ? 'mismo docente' : ''})`,
          );
        }
      }
    }

    return {
      success: errores.length === 0,
      errores,
    };
  }

  //
  async verificarCruzesCursosTransversalesUpdate(
    cursosAgrupados: grupo_sincro[],
    horarios: HorarioUpdateDto[],
  ): Promise<string[]> {
    const errores: string[] = [];

    for (const cursoAgrupado of cursosAgrupados) {
      const curso = await this.prismaService.curso.findUnique({
        where: { id: cursoAgrupado.curso_id },
      });

      if (!curso) continue;

      const turnoHorarios = await this.prismaService.horario.findMany({
        where: { turno_id: curso.turno_id },
        include: { curso: true },
      });

      for (const hNuevo of horarios) {
        const inicioNuevo = hNuevo.h_inicio
          ? this.parseHora(hNuevo.h_inicio)
          : null;
        const finNuevo = hNuevo.h_fin ? this.parseHora(hNuevo.h_fin) : null;
        if (!inicioNuevo || !finNuevo) continue;

        for (const hExistente of turnoHorarios) {
          if (hNuevo.turno_id !== hExistente.turno_id) continue;

          // Excluir el mismo horario si está siendo actualizado
          if (hNuevo.id && hExistente.id === hNuevo.id) continue;

          if (hNuevo.dia !== hExistente.dia) continue;

          const inicioExistente = this.parseHora(hExistente.h_inicio);
          const finExistente = this.parseHora(hExistente.h_fin);

          const cruceHoras =
            inicioNuevo < finExistente && finNuevo > inicioExistente;

          if (cruceHoras) {
            errores.push(
              `⛔ Cruce de hora con curso "${hExistente.curso?.c_nomcur}" en turno ${curso.turno_id} el día ${hNuevo.dia}`,
            );
          }
        }
      }
    }

    return errores;
  }

  async updateHorarioArray(updateHorarioArrayDto: UpdateHorarioArrayDto) {
    const verificacion = await this.verificarCruzeUpdate(updateHorarioArrayDto);

    if (!verificacion.success && updateHorarioArrayDto.verificar) {
      return {
        success: false,
        errores: verificacion.errores,
      };
    }

    const { dataArray } = updateHorarioArrayDto;

    let cursosCreados = 0;
    let horariosCreados = 0;
    let horariosActualizados = 0;

    for (const { curso, horarios } of dataArray) {
      const cursoExistente = await this.prismaService.curso.findFirst({
        where: {
          n_codper: curso.n_codper,
          c_codfac: curso.c_codfac,
          c_codesp: curso.c_codesp,
          c_codcur: curso.c_codcur,
          n_ciclo: curso.n_ciclo,
          turno_id: curso.turno_id,
        },
        include: { cursosPadres: true },
      });

      let cursoCreado = cursoExistente;

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
            n_codper_equ: curso.n_codper_equ,
            c_codmod_equ: Number(curso.c_codmod_equ),
            c_codfac_equ: curso.c_codfac_equ,
            c_codesp_equ: curso.c_codesp_equ,
            c_codcur_equ: curso.c_codcur_equ,
            c_nomcur_equ: curso.c_nomcur_equ,
          },
          include: { cursosPadres: true },
        });
        cursosCreados++;
      } else {
        if (
          cursoCreado?.cursosPadres.length !== 0 &&
          cursoCreado?.cursosPadres[0].tipo === 0
        ) {
          const cursosAgrupados =
            await this.prismaService.grupo_sincro.findMany({
              where: {
                padre_curso_id: cursoCreado.cursosPadres[0].padre_curso_id,
              },
              include: {
                cursosHijo: true,
              },
            });

          const errores = await this.verificarCruzesCursosTransversalesUpdate(
            cursosAgrupados,
            horarios,
          );

          if (errores.length > 0) {
            return {
              success: false,
              errores,
            };
          }

          const idCursos = cursosAgrupados.map((g) => g.curso_id);

          for (const horario of horarios) {
            if (horario.docente_id) {
              const h = await this.prismaService.horario.findUnique({
                where: { id: horario.id },
              });

              if (h && h.n_horas != null) {
                const diferencia = (horario.n_horas ?? 0) - h.n_horas;

                await this.prismaService.docente.update({
                  where: { id: horario.docente_id },
                  data: {
                    h_total: {
                      increment: diferencia,
                    },
                  },
                });
              }
            }
          }

          await this.prismaService.horario.deleteMany({
            where: {
              curso_id: { in: idCursos },
            },
          });

          // 4️⃣ Volver a crear los mismos horarios para todos los cursos sincronizados
          for (const grupo of cursosAgrupados) {
            const cursoHijo = grupo.cursosHijo;

            for (const horario of horarios) {
              let dia = horario.dia;
              let h_inicio = horario.h_inicio;
              let h_fin = horario.h_fin;
              let n_horas = horario.n_horas;
              let c_color = horario.c_color;
              let tipo = horario.tipo;
              let aula_id = horario.aula_id;
              let docente_id = horario.docente_id;

              // Si el horario tiene ID, traer su info de BD si faltan campos
              if (horario.id) {
                const horarioBD = await this.prismaService.horario.findUnique({
                  where: { id: horario.id },
                });

                if (horarioBD) {
                  dia = dia ?? horarioBD.dia;
                  h_inicio =
                    h_inicio ??
                    (horarioBD.h_inicio
                      ? horarioBD.h_inicio.toISOString()
                      : '');
                  h_fin =
                    h_fin ??
                    (horarioBD.h_fin ? horarioBD.h_fin.toISOString() : '');
                  n_horas = n_horas ?? horarioBD.n_horas;
                  c_color = c_color ?? horarioBD.c_color;
                  tipo = tipo ?? horarioBD.tipo;
                  aula_id =
                    aula_id ??
                    (horarioBD.aula_id !== null
                      ? horarioBD.aula_id
                      : undefined);
                  docente_id =
                    docente_id ??
                    (horarioBD.docente_id !== null
                      ? horarioBD.docente_id
                      : undefined);
                }
              }

              // Si falta algo importante, omitir
              if (!dia || !h_inicio || !h_fin) continue;

              await this.prismaService.horario.create({
                data: {
                  dia,
                  h_inicio: new Date(h_inicio),
                  h_fin: new Date(h_fin),
                  n_horas: n_horas ?? 0,
                  c_color: c_color ?? '#000000',
                  tipo: tipo ?? 'Teoría',
                  turno_id: cursoHijo.turno_id,
                  curso_id: cursoHijo.id,
                  aula_id: aula_id ?? null,
                  docente_id: docente_id ?? null,
                },
              });

              horariosCreados++;
            }
          }

          continue;
        }
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
                tipo: horario.tipo,
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
            tipo: horario.tipo || '',
            turno_id: curso.turno_id,
            aula_id: horario.aula_id ?? null,
            docente_id: horario.docente_id ?? null,
            curso_id: cursoExistente?.id || 0,
          },
        });

        horariosCreados++;
      }
    }

    return {
      success: true,
      mensaje: '✅ Cursos y horarios procesados correctamente',
      cursos_nuevos: cursosCreados,
      horarios_creados: horariosCreados,
      horarios_actualizados: horariosActualizados,
    };
  }

  async deleteHorarioArray(deleteHorarioArray: DeleteHorarioArrayDto) {
    for (const horario_id of deleteHorarioArray.horarios_id) {
      try {
        const horario = await this.prismaService.horario.findFirst({
          where: { id: horario_id },
          include: { curso: { include: { cursosPadres: true } } },
        });

        if (horario?.curso?.cursosPadres?.[0]?.tipo === 0) {
          const grupoCursos = await this.prismaService.grupo_sincro.findMany({
            where: {
              padre_curso_id: horario.curso.cursosPadres[0].padre_curso_id,
            },
          });

          const cursosIds = grupoCursos.map((g) => g.curso_id);
          await this.prismaService.horario.deleteMany({
            where: { curso_id: { in: cursosIds } },
          });
        } else {
          await this.prismaService.horario.delete({
            where: { id: horario_id },
          });
        }
      } catch (error) {
        console.warn(`No se pudo eliminar el horario ${horario_id}:`, error);
      }
    }

    return {
      message: 'Proceso de eliminación finalizado.',
    };
  }

  async getHorariosTurno(turno_id: number) {
    return await this.prismaService.horario.findMany({
      where: { turno_id },
      include: { curso: { include: { cursosPadres: true } } },
    });
  }

  async getHorario(id: number) {
    const horario = await this.prismaService.horario.findUnique({
      where: { id },
    });

    if (!horario) {
      throw new NotFoundException('No se encontro el horario con ese id');
    }

    return horario;
  }

  async createCursoTransversal(createTransversalDto: CreateTransversalDto) {
    const { padre_id, hijos_id } = createTransversalDto;
    const errores: string[] = [];

    // Obtener datos del curso padre con su turno
    const cursoPadre = await this.prismaService.curso.findUnique({
      where: { id: padre_id },
      include: { turno: true },
    });

    if (!cursoPadre) throw new Error('Curso padre no encontrado');

    const padreHorarios = await this.prismaService.horario.findMany({
      where: { curso_id: cursoPadre.id },
    });

    const cursosHijos = await this.prismaService.curso.findMany({
      where: { id: { in: hijos_id } },
    });

    const turnosIds = cursosHijos.map((c) => c.turno_id);

    for (const padreHorario of padreHorarios) {
      const inicio1 = this.parseHora(padreHorario.h_inicio);
      const fin1 = this.parseHora(padreHorario.h_fin);

      const horariosBd = await this.prismaService.horario.findMany({
        where: {
          dia: padreHorario.dia,
          turno_id: { in: turnosIds },
        },
        include: { curso: true },
      });

      for (const horarioBD of horariosBd) {
        const inicio2 = this.parseHora(horarioBD.h_inicio);
        const fin2 = this.parseHora(horarioBD.h_fin);

        const cruceHoras = inicio1 < fin2 && fin1 > inicio2;
        const mismoAula =
          padreHorario.aula_id &&
          horarioBD.aula_id &&
          padreHorario.aula_id === horarioBD.aula_id;
        const mismoDocente =
          padreHorario.docente_id &&
          horarioBD.docente_id &&
          padreHorario.docente_id === horarioBD.docente_id;

        if (cruceHoras || mismoAula || mismoDocente) {
          errores.push(
            `⛔ Conflicto con curso "${horarioBD.curso.c_nomcur}" en BD el día ${padreHorario.dia} ` +
              `entre ${this.formatoHora(inicio1)} - ${this.formatoHora(fin1)} y ${this.formatoHora(inicio2)} - ${this.formatoHora(fin2)} ` +
              `(${mismoAula ? 'misma aula' : ''}${mismoAula && mismoDocente ? ' y ' : ''}${mismoDocente ? 'mismo docente' : ''})`,
          );
        }
      }
    }

    // Mostrar errores si existen y no continuar
    if (errores.length > 0) {
      throw new BadRequestException({
        mensaje:
          '⛔ Se encontraron conflictos al asociar los cursos transversales',
        errores,
      });
    }

    // Iniciar shortname con datos del padre
    let shortname = `${cursoPadre.c_codcur}-1-${cursoPadre.n_codper.slice(-3)}-${cursoPadre.turno.c_grpcur}`;

    for (const hijo_id of hijos_id) {
      const cursoHijo = await this.prismaService.curso.findUnique({
        where: { id: hijo_id },
        include: { turno: true },
      });

      if (!cursoHijo) continue;

      shortname += cursoHijo.turno.c_grpcur;
    }

    const dataGrupo = hijos_id.map((hijo_id) => ({
      curso_id: hijo_id,
      padre_curso_id: padre_id,
      tipo: 0,
      shortname: shortname,
    }));
    dataGrupo.push({
      curso_id: padre_id,
      padre_curso_id: padre_id,
      tipo: 0,
      shortname: shortname,
    });

    await this.prismaService.grupo_sincro.createMany({ data: dataGrupo });

    await this.prismaService.horario.deleteMany({
      where: { curso_id: { in: hijos_id } },
    });

    for (const hijo_id of hijos_id) {
      const cursoHijo = await this.prismaService.curso.findUnique({
        where: { id: hijo_id },
      });

      for (const padreHorario of padreHorarios) {
        await this.prismaService.horario.create({
          data: {
            dia: padreHorario.dia,
            h_inicio: padreHorario.h_inicio,
            h_fin: padreHorario.h_fin,
            n_horas: padreHorario.n_horas,
            c_color: padreHorario.c_color,
            tipo: padreHorario.tipo,
            aula_id: padreHorario.aula_id,
            docente_id: padreHorario.docente_id,
            curso_id: padreHorario.curso_id,
            turno_id: cursoHijo?.turno_id || 0,
          },
        });
      }
    }

    return {
      mensaje: '✅ Cursos transversales asociados correctamente',
      shortname,
    };
  }

  async deleteAgrupado(padre_curso_id: number) {
    const grupoIds = await this.prismaService.grupo_sincro.findMany({
      where: { padre_curso_id },
      select: { id: true },
    });

    const ids = grupoIds.map((g) => g.id);

    if (ids.length === 0) return;

    const results = await this.prismaService.grupo_sincro.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return {
      message: `Se eliminaron el grupo_sincro con padre_id ${padre_curso_id} total => ${results.count}`,
    };
  }

  async getCursos(
    c_codmod?: number,
    n_codper?: string,
    c_codfac?: string,
    c_codesp?: string,
    c_codcur?: string,
    turno_id?: number,
    skip?: number,
    take?: number,
  ) {
    const where = {
      ...(turno_id && { turno_id }),
      ...(c_codmod && { c_codmod }),
      ...(n_codper && { n_codper }),
      ...(c_codfac && { c_codfac }),
      ...(c_codesp && { c_codesp }),
      ...(c_codcur && { c_codcur }),
    };

    if (take === undefined || take === 0) {
      // ⚠️ Sin paginación, trae todo
      const data = await this.prismaService.curso.findMany({
        where,
        include: {
          Horario: { include: { Docente: true, aula: true } },
          turno: true,
          cursosPadres: { include: { cursoPadre: true } },
          cursosHijos: {
            include: { cursosHijo: { include: { turno: true } } },
          },
        },
      });

      return {
        data,
        total: data.length,
        skip: 0,
        take: 0,
        totalPages: 1,
      };
    }

    // ✅ Con paginación
    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.curso.findMany({
        where,
        skip: skip || 0,
        take,
        include: {
          Horario: { include: { Docente: true, aula: true } },
          turno: true,
          cursosPadres: { include: { cursoPadre: true } },
          cursosHijos: {
            include: { cursosHijo: { include: { turno: true } } },
          },
        },
      }),
      this.prismaService.curso.count({ where }),
    ]);

    return {
      data,
      total,
      skip: skip || 0,
      take,
      totalPages: Math.ceil(total / take),
    };
  }

  async updateCursoTransversal(padre_curso_id: number) {
    const horarios = await this.prismaService.grupo_sincro.findMany({
      where: { padre_curso_id: padre_curso_id },
      include: { cursosHijo: true },
    });

    return horarios;
  }
}

//agrupas cusos
//editar cursos agregar logica de transversal
//el botom para copiar => pensarlo mejor
//virtuales
//uma plus
