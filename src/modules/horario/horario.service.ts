import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHorarioArrayDto } from './dto/createHorarioArrayDto';
import { DeleteHorarioArrayDto } from './dto/deleteHorarioArrayDto';
import { UpdateHorarioArrayDto } from './dto/updateHorarioArrayDto';
import { CreateTransversalDto } from './dto/createTransversalDto';
import { CreateHorarioAsyncDto } from './dto/createHorarioAsyncDto';
import {
  formatoHora,
  parseHora,
  verificarCruzeCreate,
  verificarCruzesCursosTransversales,
  verificarCruzesCursosTransversalesUpdate,
  verificarCruzeUpdate,
} from 'src/common/utils/cruze.util';
import { createLog } from 'src/common/utils/log.util';

@Injectable()
export class HorarioService {
  constructor(private readonly prismaService: PrismaService) {}

  //se agrego log
  async createHorarioArray(
    user_id: number,
    createHorarioArray: CreateHorarioArrayDto,
  ) {
    // 1 => funcion para validar cruzes
    const verificacion = await verificarCruzeCreate(
      this.prismaService,
      createHorarioArray,
    );

    // 2 => If validar cruze
    if (!verificacion.success && createHorarioArray.verificar) {
      return {
        success: false,
        errores: verificacion.errores,
      };
    }

    const { dataArray } = createHorarioArray;

    let cursosCreados = 0;
    let horariosCreados = 0;

    // 3 =>  Inicio de crear horarios
    for (const data of dataArray) {
      const { curso, horarios } = data;

      // 4 => traer curso si existe
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

      // 5 => si curso no existe se crea
      if (!cursoExistente) {
        cursoCreado = await this.prismaService.curso.create({
          data: {
            n_codper: curso.n_codper,
            c_codmod: curso.c_codmod,
            c_codfac: curso.c_codfac,
            nom_fac: curso.nom_fac,
            c_codesp: curso.c_codesp,
            nomesp: curso.nomesp,
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

        await createLog(
          this.prismaService,
          user_id,
          'curso',
          'CREATE',
          'Se creó un nuevo curso automáticamente al actualizar horarios',
          null,
          {},
          cursoCreado,
        );
        cursosCreados++;

        // 6 => Si el curso si existe
      } else {
        // 7 => Se verifica si el curso es transversal
        if (
          cursoCreado?.cursosPadres.length !== 0 &&
          cursoCreado?.cursosPadres[0].tipo === 0
        ) {
          // 8 => traer cursos agrupados
          const cursosAgrupados =
            await this.prismaService.grupo_sincro.findMany({
              where: {
                padre_curso_id: cursoCreado.cursosPadres[0].padre_curso_id,
              },
              include: {
                cursosHijo: true,
              },
            });

          // 9 => funcion verificar cruze con curso transversales
          const errores = await verificarCruzesCursosTransversales(
            this.prismaService,
            cursosAgrupados,
            horarios,
          );

          // 10 => Validar cruze con curso transversales
          if (errores.length > 0) {
            return {
              success: false,
              errores,
            };
          }

          // 11 => se actualiza el n_horas de docente
          for (const horario of horarios) {
            if (horario.docente_id) {
              await this.prismaService.docente.update({
                where: { id: horario.docente_id },
                data: { h_total: { increment: horario.n_horas } },
              });
            }
            await createLog(
              this.prismaService,
              user_id,
              'docente',
              'UPDATE',
              `Se asignaron ${horario.n_horas} horas al docente ${horario.docente_id} por asignación grupal`,
              null,
              {},
              {
                docente_id: horario.docente_id,
                h_total: `+ ${horario.n_horas}`,
              },
            );
          }

          // 12 => crear cursos transversales
          for (const grupo of cursosAgrupados) {
            for (const horario of horarios) {
              const nuevoHorario = await this.prismaService.horario.create({
                data: {
                  dia: horario.dia,
                  h_inicio: horario.h_inicio,
                  h_fin: horario.h_fin,
                  n_horas: horario.n_horas,
                  c_color: horario.c_color,
                  tipo: horario.tipo,
                  turno_id: grupo.cursosHijo.turno_id,
                  curso_id: grupo.cursosHijo.id,
                  aula_id: horario.aula_id || null,
                  docente_id: horario.docente_id || null,
                  h_umaPlus: horario.h_umaPlus || null,
                },
              });
              await createLog(
                this.prismaService,
                user_id,
                'horario',
                'CREATE',
                `Se creó horario para curso agrupado hijo ${grupo.cursosHijo.id}`,
                null,
                {},
                nuevoHorario,
              );
              horariosCreados++;
            }
          }
          continue;
        }
      }

      // 13 => Crear cursos normales
      for (const horario of horarios) {
        const nuevoHorario = await this.prismaService.horario.create({
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
            h_umaPlus: horario.h_umaPlus || null,
          },
        });

        await createLog(
          this.prismaService,
          user_id,
          'horario',
          'CREATE',
          `Se creó horario para el curso ${curso.c_nomcur}`,
          null,
          {},
          nuevoHorario,
        );

        if (horario.docente_id) {
          await this.prismaService.docente.update({
            where: { id: horario.docente_id },
            data: { h_total: { increment: horario.n_horas } },
          });
          await createLog(
            this.prismaService,
            user_id,
            'docente',
            'UPDATE',
            `Se asignaron ${horario.n_horas} horas al docente ${horario.docente_id} por nuevo horario`,
            null,
            {},
            { docente_id: horario.docente_id, h_total: `+ ${horario.n_horas}` },
          );
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

  //se agrego log
  async updateHorarioArray(
    user_id: number,
    updateHorarioArrayDto: UpdateHorarioArrayDto,
  ) {
    // 1 => Verificar conflictos de horario con datos actuales
    const verificacion = await verificarCruzeUpdate(
      this.prismaService,
      updateHorarioArrayDto,
    );

    // 2 => Validar si se desea verificar y hay errores
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

    // 3 => Iterar sobre cada conjunto curso-horarios
    for (const { curso, horarios } of dataArray) {
      // 4 => Buscar si ya existe el curso en la BD
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

      // 5 => Crear curso si no existe
      if (!cursoExistente) {
        cursoCreado = await this.prismaService.curso.create({
          data: {
            n_codper: curso.n_codper,
            c_codmod: curso.c_codmod,
            c_codfac: curso.c_codfac,
            nom_fac: curso.nom_fac,
            c_codesp: curso.c_codesp,
            nomesp: curso.nomesp,
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
        await createLog(
          this.prismaService,
          user_id,
          'curso',
          'CREATE',
          `Se creó el curso "${curso.c_nomcur}"`,
          null,
          {},
          cursoCreado,
        );
        cursosCreados++;
      }

      // 6 => Verificar si el curso es parte de una relación transversal
      if (
        cursoCreado?.cursosPadres.length !== 0 &&
        cursoCreado?.cursosPadres[0].tipo === 0
      ) {
        // 7 => Obtener todos los cursos agrupados (hijos) sincronizados
        const cursosAgrupados = await this.prismaService.grupo_sincro.findMany({
          where: {
            padre_curso_id: cursoCreado.cursosPadres[0].padre_curso_id,
          },
          include: {
            cursosHijo: true,
          },
        });

        // 8 => Verificar si hay conflictos de horario con los cursos agrupados
        const errores = await verificarCruzesCursosTransversalesUpdate(
          this.prismaService,
          cursosAgrupados,
          horarios,
        );

        // 9 => Si hay errores, retornar
        if (errores.length > 0) {
          return {
            success: false,
            errores,
          };
        }

        // 10 => Obtener los ID de los cursos a eliminar sus horarios
        const idCursos = cursosAgrupados.map((g) => g.curso_id);

        // 11 => Obtener horarios actuales para esos cursos
        const horariosBD = await this.prismaService.horario.findMany({
          where: {
            id: {
              in: horarios
                .map((h) => h.id)
                .filter((id): id is number => id !== undefined),
            },
          },
          select: {
            id: true,
            docente_id: true,
            n_horas: true,
          },
        });

        // 12 => Mapear los horarios encontrados por ID
        const mapHorarioBD = new Map<
          number,
          { docente_id: number | null; n_horas: number | null }
        >();
        horariosBD.forEach((h) => mapHorarioBD.set(h.id, h));

        // 13 => Actualizar carga horaria de los docentes involucrados
        for (const horario of horarios) {
          const nuevoDocenteId = horario.docente_id;
          const nuevasHoras = horario.n_horas ?? 0;

          if (horario.id && mapHorarioBD.has(horario.id)) {
            const anterior = mapHorarioBD.get(horario.id);

            // 14 => Si cambió el docente
            if (anterior?.docente_id !== nuevoDocenteId) {
              // 15 => Descontar horas al anterior
              if (anterior?.docente_id && anterior.n_horas != null) {
                await this.prismaService.docente.update({
                  where: { id: anterior.docente_id },
                  data: { h_total: { decrement: anterior.n_horas } },
                });
                await createLog(
                  this.prismaService,
                  user_id,
                  'docente',
                  'UPDATE',
                  `Se descontaron ${anterior.n_horas} horas al docente ${anterior.docente_id} por reasignación de horario`,
                  null,
                  {
                    docente_id: anterior.docente_id,
                    h_total: `- ${anterior.n_horas}`,
                  },
                  {},
                );
              }

              // 16 => Asignar horas al nuevo docente
              if (nuevoDocenteId) {
                await this.prismaService.docente.update({
                  where: { id: nuevoDocenteId },
                  data: { h_total: { increment: nuevasHoras } },
                });
                await createLog(
                  this.prismaService,
                  user_id,
                  'docente',
                  'UPDATE',
                  `Se asignaron ${nuevasHoras} horas al docente ${nuevoDocenteId} por nuevo horario`,
                  null,
                  {},
                  { docente_id: nuevoDocenteId, h_total: `+ ${nuevasHoras}` },
                );
              }
            }

            // 17 => Si no cambió el docente pero cambió el número de horas
            else if (nuevoDocenteId && anterior?.n_horas != null) {
              const diferencia = nuevasHoras - anterior.n_horas;
              if (diferencia !== 0) {
                await this.prismaService.docente.update({
                  where: { id: nuevoDocenteId },
                  data: { h_total: { increment: diferencia } },
                });
                await createLog(
                  this.prismaService,
                  user_id,
                  'docente',
                  'UPDATE',
                  `Se ajustaron ${diferencia > 0 ? '+' : ''}${diferencia} horas al docente ${nuevoDocenteId} por modificación de horario`,
                  null,
                  { docente_id: nuevoDocenteId, h_total: anterior.n_horas },
                  { docente_id: nuevoDocenteId, h_total: nuevasHoras },
                );
              }
            }
          }

          // 18 => Si el horario es nuevo, solo se suma horas al docente
          else if (!horario.id && nuevoDocenteId) {
            await this.prismaService.docente.update({
              where: { id: nuevoDocenteId },
              data: { h_total: { increment: nuevasHoras } },
            });
            await createLog(
              this.prismaService,
              user_id,
              'docente',
              'UPDATE',
              `Se asignaron ${nuevasHoras} horas al docente ${nuevoDocenteId} por nuevo horario`,
              null,
              {},
              { docente_id: nuevoDocenteId, h_total: `+${nuevasHoras}` },
            );
          }
        }

        // 19 => Eliminar horarios actuales de los cursos agrupados
        const horariosEliminados = await this.prismaService.horario.findMany({
          where: {
            curso_id: { in: idCursos },
          },
        });

        await this.prismaService.horario.deleteMany({
          where: {
            curso_id: { in: idCursos },
          },
        });

        await createLog(
          this.prismaService,
          user_id,
          'horario',
          'DELETE_MANY',
          'Se eliminaron horarios actuales de cursos agrupados',
          null,
          horariosEliminados,
          {},
        );

        // 20 => Crear los nuevos horarios para cada curso hijo agrupado
        for (const grupo of cursosAgrupados) {
          const cursoHijo = grupo.cursosHijo;

          for (const horario of horarios) {
            if (!horario.dia || !horario.h_inicio || !horario.h_fin) continue;

            const nuevoHorario = await this.prismaService.horario.create({
              data: {
                dia: horario.dia,
                h_inicio: new Date(horario.h_inicio),
                h_fin: new Date(horario.h_fin),
                n_horas: horario.n_horas ?? 0,
                c_color: horario.c_color ?? '#000000',
                tipo: horario.tipo ?? '',
                turno_id: cursoHijo.turno_id,
                curso_id: cursoHijo.id,
                aula_id: horario.aula_id ?? null,
                docente_id: horario.docente_id ?? null,
                h_umaPlus: horario.h_umaPlus,
              },
            });
            await createLog(
              this.prismaService,
              user_id,
              'horario',
              'CREATE',
              `Se creó horario para curso hijo ${cursoHijo.c_codcur}`,
              null,
              {},
              nuevoHorario,
            );
            horariosCreados++;
          }
        }

        // 21 => Continuar con siguiente curso si ya era transversal
        continue;
      }

      // 22 => Si no es transversal, actualización o creación normal
      const horariosBD = await this.prismaService.horario.findMany({
        where: {
          id: {
            in: horarios
              .map((h) => h.id)
              .filter((id): id is number => id !== undefined),
          },
        },
        select: {
          id: true,
          docente_id: true,
          n_horas: true,
        },
      });

      const mapHorarioBD = new Map<
        number,
        { docente_id: number | null; n_horas: number | null }
      >();
      horariosBD.forEach((h) => mapHorarioBD.set(h.id, h));

      for (const horario of horarios) {
        const nuevoDocenteId = horario.docente_id;
        const nuevasHoras = horario.n_horas ?? 0;

        if (horario.id && mapHorarioBD.has(horario.id)) {
          const anterior = mapHorarioBD.get(horario.id);

          if (anterior?.docente_id !== nuevoDocenteId) {
            if (anterior?.docente_id && anterior.n_horas != null) {
              await this.prismaService.docente.update({
                where: { id: anterior.docente_id },
                data: { h_total: { decrement: anterior.n_horas } },
              });
              await createLog(
                this.prismaService,
                user_id,
                'docente',
                'UPDATE',
                `Se descontaron ${anterior.n_horas} horas al docente ${anterior.docente_id} por cambio de horario`,
                null,
                {
                  docente_id: anterior.docente_id,
                  h_total: `- ${anterior.n_horas}`,
                },
                {},
              );
            }

            if (nuevoDocenteId) {
              await this.prismaService.docente.update({
                where: { id: nuevoDocenteId },
                data: { h_total: { increment: nuevasHoras } },
              });
              await createLog(
                this.prismaService,
                user_id,
                'docente',
                'UPDATE',
                `Se asignaron ${nuevasHoras} horas al docente ${nuevoDocenteId} por cambio de horario`,
                null,
                {},
                { docente_id: nuevoDocenteId, h_total: `+ ${nuevasHoras}` },
              );
            }
          } else if (nuevoDocenteId && anterior?.n_horas != null) {
            const diferencia = nuevasHoras - anterior.n_horas;
            if (diferencia !== 0) {
              await this.prismaService.docente.update({
                where: { id: nuevoDocenteId },
                data: { h_total: { increment: diferencia } },
              });
              await createLog(
                this.prismaService,
                user_id,
                'docente',
                'UPDATE',
                `Se ajustaron ${diferencia > 0 ? '+' : ''}${diferencia} horas al docente ${nuevoDocenteId} por modificación de horario`,
                null,
                { docente_id: nuevoDocenteId, h_total: anterior.n_horas },
                { docente_id: nuevoDocenteId, h_total: nuevasHoras },
              );
            }
          }

          const horarioAnterior = await this.prismaService.horario.findUnique({
            where: { id: horario.id },
          });

          const horarioActualizado = await this.prismaService.horario.update({
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
              h_umaPlus: horario.h_umaPlus ?? null,
            },
          });
          await createLog(
            this.prismaService,
            user_id,
            'horario',
            'UPDATE',
            `Se actualizó el horario ID ${horario.id}`,
            null,
            horarioAnterior || '',
            horarioActualizado,
          );

          horariosActualizados++;
        } else {
          const nuevoHorario = await this.prismaService.horario.create({
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
              h_umaPlus: horario.h_umaPlus ?? null,
            },
          });
          await createLog(
            this.prismaService,
            user_id,
            'horario',
            'CREATE',
            `Se creó horario para el curso ${curso.c_nomcur}`,
            null,
            {},
            nuevoHorario,
          );

          if (horario.docente_id) {
            await this.prismaService.docente.update({
              where: { id: horario.docente_id },
              data: { h_total: { increment: horario.n_horas } },
            });
            await createLog(
              this.prismaService,
              user_id,
              'docente',
              'UPDATE',
              `Se asignaron ${horario.n_horas} horas al docente ${horario.docente_id} por nuevo horario`,
              null,
              {},
              {
                docente_id: horario.docente_id,
                h_total: `+ ${horario.n_horas}`,
              },
            );
          }
          horariosCreados++;
        }
      }
    }

    // 23 => Finalizar y retornar resumen de acciones
    return {
      success: true,
      mensaje: '✅ Cursos y horarios procesados correctamente',
      cursos_nuevos: cursosCreados,
      horarios_creados: horariosCreados,
      horarios_actualizados: horariosActualizados,
    };
  }

  //se agrego log
  async deleteHorarioArray(
    user_id: number,
    deleteHorarioArray: DeleteHorarioArrayDto,
  ) {
    for (const horario_id of deleteHorarioArray.horarios_id) {
      const horario = await this.prismaService.horario.findFirst({
        where: { id: horario_id },
        include: { curso: { include: { cursosPadres: true } } },
      });

      if (!horario) {
        continue;
      }

      if (horario?.docente_id) {
        await this.prismaService.docente.update({
          where: { id: horario?.docente_id || 0 },
          data: { h_total: { decrement: horario?.n_horas } },
        });
        await createLog(
          this.prismaService,
          user_id,
          'docente',
          'UPDATE',
          `Se descontaron ${horario.n_horas} horas al docente ${horario.docente_id} por eliminación de horario`,
          null,
          { docente_id: horario.docente_id, h_total: `- ${horario.n_horas}` },
          {},
        );
      }

      if (horario?.curso?.cursosPadres?.[0]?.tipo === 0) {
        const grupoCursos = await this.prismaService.grupo_sincro.findMany({
          where: {
            padre_curso_id: horario.curso.cursosPadres[0].padre_curso_id,
          },
        });

        const cursosIds = grupoCursos.map((g) => g.curso_id);

        const horariosEliminar = await this.prismaService.horario.findMany({
          where: {
            curso_id: { in: cursosIds },
            h_inicio: horario.h_inicio,
            h_fin: horario.h_fin,
          },
        });

        await this.prismaService.horario.deleteMany({
          where: {
            curso_id: { in: cursosIds },
            h_inicio: horario.h_inicio,
            h_fin: horario.h_fin,
          },
        });
        await createLog(
          this.prismaService,
          user_id,
          'horario',
          'DELETE_MANY',
          `Se eliminaron horarios sincronizados de cursos transversales`,
          null,
          horariosEliminar,
          {},
        );
      } else {
        await this.prismaService.horario.delete({
          where: { id: horario_id },
        });
        await createLog(
          this.prismaService,
          user_id,
          'horario',
          'DELETE',
          `Se eliminó horario ID ${horario_id}`,
          null,
          horario,
          {},
        );
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

  //se agrego log
  async createCursoTransversal(
    user_id: number,
    createTransversalDto: CreateTransversalDto,
  ) {
    const { padre_id, hijos_id } = createTransversalDto;
    const errores: string[] = [];

    // 1. Obtener datos del curso padre con su turno
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

    // 2. Validar conflictos de horarios, aula y docente
    for (const padreHorario of padreHorarios) {
      const inicio1 = parseHora(padreHorario.h_inicio || '');
      const fin1 = parseHora(padreHorario.h_fin || '');

      const horariosBd = await this.prismaService.horario.findMany({
        where: {
          dia: padreHorario.dia,
          turno_id: { in: turnosIds },
        },
        include: { curso: true },
      });

      for (const horarioBD of horariosBd) {
        const inicio2 = parseHora(horarioBD.h_inicio || '');
        const fin2 = parseHora(horarioBD.h_fin || '');

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
            `⛔ Conflicto con curso "${horarioBD.curso.c_nomcur}" el día ${padreHorario.dia} ` +
              `entre ${formatoHora(inicio1)} - ${formatoHora(fin1)} y ${formatoHora(inicio2)} - ${formatoHora(fin2)} ` +
              `(${mismoAula ? 'misma aula' : ''}${mismoAula && mismoDocente ? ' y ' : ''}${mismoDocente ? 'mismo docente' : ''})`,
          );
        }
      }
    }

    // 3. Detener si hay errores
    if (errores.length > 0) {
      throw new BadRequestException({
        mensaje:
          '⛔ Se encontraron conflictos al asociar los cursos transversales',
        errores,
      });
    }

    // 4. Generar shortname inicial
    let shortname = `${cursoPadre.c_codcur}-1-${cursoPadre.n_codper.slice(-3)}-${cursoPadre.turno.c_grpcur}`;
    for (const hijo_id of hijos_id) {
      const cursoHijo = await this.prismaService.curso.findUnique({
        where: { id: hijo_id },
        include: { turno: true },
      });
      if (!cursoHijo) continue;
      shortname += cursoHijo.turno.c_grpcur;
    }

    // 5. Verificar unicidad del shortname y generar uno único
    let finalShortname = shortname;
    let intento = 1;

    while (
      await this.prismaService.grupo_sincro.findFirst({
        where: { shortname: finalShortname },
      })
    ) {
      intento++;
      finalShortname = `${shortname}-${intento}`;
    }

    // 6. Preparar datos para crear vínculos
    const dataGrupo = hijos_id.map((hijo_id) => ({
      curso_id: hijo_id,
      padre_curso_id: padre_id,
      tipo: 0,
      shortname: finalShortname,
    }));

    dataGrupo.push({
      curso_id: padre_id,
      padre_curso_id: padre_id,
      tipo: 0,
      shortname: finalShortname,
    });

    // 7. Crear vínculos en grupo_sincro
    await this.prismaService.grupo_sincro.createMany({ data: dataGrupo });

    const grupoInsertados = await this.prismaService.grupo_sincro.findMany({
      where: {
        shortname: finalShortname,
        padre_curso_id: padre_id,
      },
    });

    await createLog(
      this.prismaService,
      user_id,
      'grupo_sincro',
      'CREATE_MANY',
      'Se crearon vínculos transversales',
      null,
      {},
      grupoInsertados,
    );

    // 8. Eliminar horarios anteriores de los hijos
    const horariosAntes = await this.prismaService.horario.findMany({
      where: { curso_id: { in: hijos_id } },
    });

    await this.prismaService.horario.deleteMany({
      where: { curso_id: { in: hijos_id } },
    });

    await createLog(
      this.prismaService,
      user_id,
      'horario',
      'DELETE_MANY',
      'Se eliminaron horarios anteriores de los cursos hijos',
      null,
      horariosAntes,
      {},
    );

    // 9. Clonar los horarios del padre a cada hijo
    for (const hijo_id of hijos_id) {
      const cursoHijo = await this.prismaService.curso.findUnique({
        where: { id: hijo_id },
      });

      for (const padreHorario of padreHorarios) {
        const nuevoHorario = await this.prismaService.horario.create({
          data: {
            dia: padreHorario.dia,
            h_inicio: padreHorario.h_inicio,
            h_fin: padreHorario.h_fin,
            n_horas: padreHorario.n_horas,
            c_color: padreHorario.c_color,
            tipo: padreHorario.tipo,
            aula_id: padreHorario.aula_id,
            docente_id: padreHorario.docente_id,
            curso_id: hijo_id,
            turno_id: cursoHijo?.turno_id || 0,
          },
        });
        await createLog(
          this.prismaService,
          user_id,
          'horario',
          'CREATE',
          `Se clonó horario del curso padre al hijo ID ${hijo_id}`,
          null,
          {},
          nuevoHorario,
        );
      }
    }

    return {
      mensaje: '✅ Cursos transversales asociados correctamente',
      shortname: finalShortname,
    };
  }

  //se agrego log
  async createCursoGrupo(
    user_id: number,
    createTransversalDto: CreateTransversalDto,
  ) {
    const { padre_id, hijos_id } = createTransversalDto;

    // Obtener datos del curso padre con su turno
    const cursoPadre = await this.prismaService.curso.findUnique({
      where: { id: padre_id },
      include: { turno: true },
    });

    if (!cursoPadre) throw new Error('Curso padre no encontrado');

    // Armar el shortname con datos del padre
    let shortname = `${cursoPadre.c_codcur}-1-${cursoPadre.n_codper.slice(-3)}-${cursoPadre.turno.c_grpcur}`;

    // Agregar el grupo de cada hijo al shortname
    for (const hijo_id of hijos_id) {
      const cursoHijo = await this.prismaService.curso.findUnique({
        where: { id: hijo_id },
        include: { turno: true },
      });

      if (!cursoHijo) continue;
      shortname += cursoHijo.turno.c_grpcur;
    }

    // Construir data para grupo_sincro (padre + hijos)
    const dataGrupo = hijos_id.map((hijo_id) => ({
      curso_id: hijo_id,
      padre_curso_id: padre_id,
      tipo: 1,
      shortname,
    }));

    dataGrupo.push({
      curso_id: padre_id,
      padre_curso_id: padre_id,
      tipo: 1,
      shortname,
    });

    // Guardar la relación en grupo_sincro
    await this.prismaService.grupo_sincro.createMany({ data: dataGrupo });
    const nuevosGrupos = await this.prismaService.grupo_sincro.findMany({
      where: { padre_curso_id: padre_id },
    });
    await createLog(
      this.prismaService,
      user_id,
      'grupo_sincro',
      'CREATE_MANY',
      `Se asociaron ${hijos_id.length + 1} cursos al grupo con shortname "${shortname}"`,
      null,
      {},
      nuevosGrupos,
    );

    return {
      mensaje: '✅ Cursos grupo asociados correctamente',
      shortname,
    };
  }

  //se agrego log
  async createHorarioAsync(
    user_id: number,
    createHorarioAsyncDto: CreateHorarioAsyncDto,
  ) {
    const { curso, horario } = createHorarioAsyncDto;
    let cursosCreados = 0;

    // Verificar si el curso ya existe
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

    // Crear el curso si no existe
    if (!cursoExistente) {
      cursoCreado = await this.prismaService.curso.create({
        data: {
          n_codper: curso.n_codper,
          c_codmod: curso.c_codmod,
          c_codfac: curso.c_codfac,
          nom_fac: curso.nom_fac,
          c_codesp: curso.c_codesp,
          nomesp: curso.nomesp,
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
      await createLog(
        this.prismaService,
        user_id,
        'curso',
        'CREATE',
        'Se creo curso',
        null,
        cursoCreado,
        {},
      );
      cursosCreados++;
    }

    // Crear el horario
    const horarioCreado = await this.prismaService.horario.create({
      data: {
        n_horas: horario.n_horas,
        tipo: horario.tipo,
        curso_id: cursoCreado?.id || 0,
        turno_id: horario.turno_id,
      },
    });
    await createLog(
      this.prismaService,
      user_id,
      'horario',
      'CREATE',
      'Se creo horario',
      null,
      horarioCreado,
      {},
    );

    return {
      success: true,
      mensaje: '✅ Horario registrado exitosamente',
      curso_id: cursoCreado?.id,
      horario_id: horarioCreado.id,
      cursos_creados: cursosCreados,
    };
  }

  //se agrego log
  async deleteAgrupado(user_id: number, padre_curso_id: number) {
    const grupoIds = await this.prismaService.grupo_sincro.findMany({
      where: { padre_curso_id },
      select: { id: true, curso_id: true },
    });

    const ids = grupoIds.map((g) => g.id);
    const cursoIds = grupoIds.map((g) => g.curso_id);

    const horariosAntes = await this.prismaService.horario.findMany({
      where: { curso_id: { in: cursoIds } },
    });

    await this.prismaService.horario.deleteMany({
      where: { curso_id: { in: cursoIds } },
    });

    await createLog(
      this.prismaService,
      user_id,
      'horario',
      'DELETE_MANY',
      'Se eliminaron horarios de cursos agrupados',
      null,
      horariosAntes,
      {},
    );

    if (ids.length === 0) return;

    const grupoAntes = await this.prismaService.grupo_sincro.findMany({
      where: { id: { in: ids } },
    });

    await this.prismaService.grupo_sincro.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    await createLog(
      this.prismaService,
      user_id,
      'grupo_sincro',
      'DELETE_MANY',
      'Se eliminaron relaciones de cursos agrupados',
      null,
      grupoAntes,
      {},
    );

    return {
      message: `Se elimino grupo de cursos`,
    };
  }

  async getCursos(
    c_codmod?: number,
    n_codper?: string,
    c_codfac?: string,
    c_codesp?: string,
    c_codcur?: string,
    n_ciclo?: number,
    turno_id?: number,
    filtroBusqueda?: string,
    skip?: number,
    take?: number,
    sortField?: string,
    sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    const where: {
      [key: string]: any;
      AND?: any[];
    } = {
      ...(c_codmod && { c_codmod }),
      ...(n_codper && { n_codper }),
      ...(c_codfac && { c_codfac }),
      ...(c_codesp && { c_codesp }),
      ...(c_codcur && { c_codcur }),
      ...(n_ciclo && { n_ciclo }),
      ...(turno_id && { turno_id }),
    };

    if (filtroBusqueda) {
      const texto = filtroBusqueda.toLowerCase();

      if (!Array.isArray(where.AND)) {
        where.AND = [];
      }

      where.AND.push({
        OR: [
          { c_codcur: { contains: texto } },
          { c_nomcur: { contains: texto } },
          { nom_fac: { contains: texto } },
          { nomesp: { contains: texto } },
          { turno: { c_grpcur: { contains: texto } } },
        ],
      });
    }

    const includeConfig = {
      Horario: { include: { Docente: true, aula: true } },
      turno: true,
      cursosPadres: { include: { cursoPadre: true } },
      cursosHijos: {
        include: { cursosHijo: { include: { turno: true } } },
      },
    };

    if (!take || take === 0) {
      const data = await this.prismaService.curso.findMany({
        where,
        include: includeConfig,
      });

      return {
        data,
        total: data.length,
        skip: 0,
        take: 0,
        totalPages: 1,
      };
    }

    const orderBy = sortField ? { [sortField]: sortOrder } : undefined;

    const [data, total] = await Promise.all([
      this.prismaService.curso.findMany({
        where,
        skip: skip || 0,
        take,
        orderBy,
        include: includeConfig,
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
}
