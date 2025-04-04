import { Injectable, NotFoundException } from '@nestjs/common';
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
      // console.log('curso => ', curso);

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
        // console.log('pas => ', cursoCreado);
        if (
          cursoCreado?.cursosPadres.length !== 0 &&
          cursoCreado?.cursosPadres[0].tipo === 0
        ) {
          console.log('entro aca =======');

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
        console.log('horario => ', horario);

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

        horariosCreados++;
      }
    }

    return {
      mensaje: '✅ Cursos y horarios procesados correctamente',
      cursos_nuevos: cursosCreados,
      horarios_creados: horariosCreados,
    };
  }

  async verificarCruzeUpdate(updateHorarioArrayDto: UpdateHorarioArrayDto) {
    const errores: string[] = [];

    const todosLosHorarios: {
      h: HorarioUpdateDto;
      curso: CursoUpdateDto;
    }[] = [];

    for (const data of updateHorarioArrayDto.dataArray) {
      const { curso, horarios } = data;

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

          if (cruceHoras && (mismoAula || mismoDocente)) {
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
    for (const { h } of todosLosHorarios) {
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

        if (cruce && (mismoAula || mismoDocente)) {
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
            c_codmod_equ: Number(curso.c_codmod_equ),
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
            curso_id: cursoExistente.id,
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

  async createCursoAgrupado(createTransversalDto: CreateTransversalDto) {
    const { padre_id, hijos_id } = createTransversalDto;

    // Obtener datos del curso padre con su turno
    const cursoPadre = await this.prismaService.curso.findUnique({
      where: { id: padre_id },
      include: { turno: true },
    });

    if (!cursoPadre) throw new Error('Curso padre no encontrado');

    // Iniciar shortname con datos del padre
    let shortname = `${cursoPadre.c_codcur}-1-${cursoPadre.n_codper.slice(-3)}-${cursoPadre.turno.c_grpcur}`;

    const hijos: { id: number }[] = [];

    for (const hijo_id of hijos_id) {
      const cursoHijo = await this.prismaService.curso.findUnique({
        where: { id: hijo_id },
        include: { turno: true },
      });

      if (!cursoHijo) continue;

      shortname += cursoHijo.turno.c_grpcur;
      hijos.push(cursoHijo);
    }

    await this.prismaService.grupo_sincro.create({
      data: {
        curso_id: padre_id,
        padre_curso_id: padre_id,
        shortname,
        tipo: 0,
      },
    });

    // Registrar grupo_sincro para cada hijo
    for (const hijo of hijos) {
      await this.prismaService.grupo_sincro.create({
        data: {
          curso_id: hijo.id,
          padre_curso_id: padre_id,
          shortname,
          tipo: 0,
        },
      });
    }

    return {
      mensaje: '✅ Cursos transversales asociados correctamente',
      shortname,
      hijos_asociados: hijos.length,
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
