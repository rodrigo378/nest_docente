import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHorarioArrayDto } from './dto/createHorarioArrayDto';
import { DeleteHorarioArrayDto } from './dto/deleteHorarioArrayDto';
import { UpdateHorarioArrayDto } from './dto/updateHorarioArrayDto';
import { CreateTransversalDto } from './dto/createTransversalDto';
import { CreateHorarioAsyncDto } from './dto/createHorarioAsyncDto';
import {
  parseHora,
  formatoHora,
  verificarCruzeUpdate,
  verificarCruzeCreate,
  verificarCruzesCursosTransversales,
  verificarCruzesCursosTransversalesUpdate,
} from 'src/common/utils/cruze.util';
import { createLog } from 'src/common/utils/log.util';
import { asignarHoraDocente } from 'src/common/utils/asignarHoraDocente';

interface HorarioRaw {
  tipo: number | null;
  padre_curso_id: number | null;
  curso_id: number;
  n_codper: number;
  c_codfac: string;
  nom_fac: string;
  c_codesp: string;
  nomesp: string;
  c_codcur: string;
  c_nomcur: string;
  c_grpcur: string;
  c_nommod: string;
  n_ciclo: number;
  n_codpla: number;
  c_nomdoc: string;
  dia: string;
  h_inicio: string;
  h_fin: string;
  n_horas: string;
  tipoCurso: string;
  c_codaula: string;
  n_piso: string;
  pabellon;
}

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

          // 11 => crear cursos transversales
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
                  modalidad: horario.modalidad,
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

          // 12 => se actualiza el n_horas de docente
          for (const horario of horarios) {
            if (horario.docente_id) {
              // console.log('se creo 1');
              // console.log('=> ', horario.docente_id);

              await asignarHoraDocente(
                this.prismaService,
                horario.docente_id,
                user_id,
              );
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
            modalidad: horario.modalidad,
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
          // console.log('se creo 2');
          // console.log('=> horario.docente_id');

          await asignarHoraDocente(
            this.prismaService,
            horario.docente_id,
            user_id,
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

    const docentesAActualizar = new Set<number>(); // <-- Recolección única de docentes

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
        const cursosAgrupados = await this.prismaService.grupo_sincro.findMany({
          where: {
            padre_curso_id: cursoCreado.cursosPadres[0].padre_curso_id,
          },
          include: {
            cursosHijo: true,
          },
        });

        const errores = await verificarCruzesCursosTransversalesUpdate(
          this.prismaService,
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
                modalidad: horario.modalidad,
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

            if (horario.docente_id) {
              docentesAActualizar.add(horario.docente_id);
            }
          }
        }

        continue;
      }

      // 22 => Si no es transversal, actualización o creación normal
      const horariosBD = await this.prismaService.horario.findMany({
        where: {
          id: {
            in: horarios
              .map((h) => h.id)
              .filter((id): id is number => id !== undefined && id !== null),
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

        if (nuevoDocenteId) {
          docentesAActualizar.add(nuevoDocenteId);
        }

        if (horario.id && mapHorarioBD.has(horario.id)) {
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
              modalidad: horario.modalidad ?? null,
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
              modalidad: horario.modalidad,
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
          horariosCreados++;
        }
      }
    }

    // ✅ Actualizar todos los docentes afectados
    for (const docenteId of docentesAActualizar) {
      await asignarHoraDocente(this.prismaService, docenteId, user_id);
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

      if (!horario) continue;

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

        const docentesIds = [
          ...new Set(horariosEliminar.map((h) => h.docente_id).filter(Boolean)),
        ];
        for (const docenteId of docentesIds) {
          if (docenteId)
            await asignarHoraDocente(this.prismaService, docenteId, user_id);
        }

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

        // ✅ Recalcular carga del docente único
        if (horario?.docente_id) {
          await asignarHoraDocente(
            this.prismaService,
            horario.docente_id,
            user_id,
          );
        }

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
            h_umaPlus: padreHorario.h_umaPlus,
            modalidad: padreHorario.modalidad,
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
        modalidad: 'vir',
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

    const docentesAfectados = Array.from(
      new Set(
        horariosAntes
          .map((h) => h.docente_id)
          .filter((id): id is number => id !== null),
      ),
    );

    await this.prismaService.horario.deleteMany({
      where: { curso_id: { in: cursoIds } },
    });

    for (const docente_id of docentesAfectados) {
      await asignarHoraDocente(this.prismaService, docente_id, user_id);
    }

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
    periodo?: number,
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
    // console.log('n_codper => ', n_codper);

    const where: {
      [key: string]: any;
      AND?: any[];
    } = {
      ...(c_codmod && { c_codmod }),
      ...(n_codper !== '0' && n_codper && { n_codper }),
      ...(c_codfac && { c_codfac }),
      ...(c_codesp && { c_codesp }),
      ...(c_codcur && { c_codcur }),
      ...(n_ciclo && { n_ciclo }),
      ...(turno_id && { turno_id }),
      ...(periodo && {
        turno: {
          n_codper: periodo,
        },
      }),
      AND: [{ c_alu: { not: 0 } }, { c_alu: { not: null } }],
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
      turno: { include: { periodo: true } },
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

    const fechaActual = new Date();
    const dataConVencimiento = data.map((curso) => {
      const fCierre = curso.turno?.periodo?.f_cierre;
      const vencio = fCierre ? fechaActual > new Date(fCierre) : false;
      return { ...curso, vencio };
    });

    return {
      data: dataConVencimiento,
      total,
      skip: skip || 0,
      take,
      totalPages: Math.ceil(total / take),
    };
  }

  async getReporte(filtros?: {
    n_codper?: number;
    c_codfac?: string;
    c_codesp?: string;
    c_grpcur?: string;
    c_codmod?: string;
    n_ciclo?: number;
    n_codpla?: number;
  }) {
    const whereTurno = Object.fromEntries(
      Object.entries(filtros || {}).filter(([, v]) => v !== undefined),
    );

    const condiciones: string[] = [];
    const valores: (string | number)[] = [];

    if (whereTurno.n_codper) {
      condiciones.push('t.n_codper = ?');
      valores.push(whereTurno.n_codper);
    }

    if (whereTurno.c_codfac) {
      condiciones.push('t.c_codfac = ?');
      valores.push(whereTurno.c_codfac);
    }

    if (whereTurno.c_codesp) {
      condiciones.push('t.c_codesp = ?');
      valores.push(whereTurno.c_codesp);
    }

    if (whereTurno.c_grpcur) {
      condiciones.push('t.c_grpcur = ?');
      valores.push(whereTurno.c_grpcur);
    }

    if (whereTurno.c_codmod) {
      condiciones.push('t.c_codmod = ?');
      valores.push(whereTurno.c_codmod);
    }

    if (whereTurno.n_ciclo !== undefined) {
      condiciones.push('t.n_ciclo = ?');
      valores.push(whereTurno.n_ciclo);
    }

    if (whereTurno.n_codpla !== undefined) {
      condiciones.push('t.n_codpla = ?');
      valores.push(whereTurno.n_codpla);
    }

    const whereClause =
      condiciones.length > 0 ? `WHERE ${condiciones.join(' AND ')}` : '';

    const horariosData = await this.prismaService.$queryRawUnsafe<HorarioRaw[]>(
      `
    SELECT
      g_s.tipo,
      g_s.padre_curso_id,
      h.curso_id,
      t.n_codper,
      t.c_codfac,
      t.nom_fac,
      t.c_codesp,
      t.nomesp,
      c.c_codcur,
      c.c_nomcur,
      t.c_grpcur,
      t.c_nommod,
      t.n_ciclo,
      t.n_codpla,
      d.c_nomdoc,
      h.dia,
      h.h_inicio,
      h.h_fin,
      h.n_horas,
      h.tipo as tipoCurso,
      a.c_codaula,
      a.n_piso,
      a.pabellon
    FROM horario h
    LEFT JOIN turno t ON t.id = h.turno_id
    LEFT JOIN curso c ON c.id = h.curso_id
    LEFT JOIN docente d ON d.id = h.docente_id
    LEFT JOIN aula a ON a.id = h.aula_id
    LEFT JOIN grupo_sincro g_s ON g_s.curso_id = h.curso_id
    ${whereClause};
    `,
      ...valores,
    );

    const agrupado = Object.values(
      horariosData.reduce((acc: Record<string, HorarioRaw[]>, item) => {
        const agrupador =
          item.tipo === 0 // transversal
            ? (item.padre_curso_id ?? item.curso_id)
            : item.tipo === 1 // agrupado
              ? (item.padre_curso_id ?? item.curso_id)
              : item.curso_id;

        if (!acc[agrupador]) acc[agrupador] = [];
        acc[agrupador].push(item);
        return acc;
      }, {}),
    ).map((grupo) => {
      // Agrupar combinaciones únicas de día - hora inicio - hora fin
      const horariosUnicos = Array.from(
        new Map(
          grupo.map((x) => {
            const hini = new Date(x.h_inicio).toLocaleTimeString('es-PE', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            });
            const hfin = new Date(x.h_fin).toLocaleTimeString('es-PE', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            });
            return [`${x.dia}|${hini}|${hfin}`, { dia: x.dia, hini, hfin }];
          }),
        ).values(),
      );

      return {
        n_codper: String(grupo[0].n_codper),
        c_codfac: String(grupo[0].c_codfac),
        nom_fac: grupo[0].nom_fac,
        c_codesp: String(grupo[0].c_codesp),
        nomesp: grupo[0].nomesp,
        c_codcur: [...new Set(grupo.map((x) => x.c_codcur))].join(', '),
        c_nomcur: [...new Set(grupo.map((x) => x.c_nomcur))].join(', '),
        // c_grpcur: grupo.map((x) => x.c_grpcur).join(', '),
        c_grpcur: [...new Set(grupo.map((x) => x.c_grpcur))].join(', '),
        modalidad: grupo[0].c_nommod,
        n_ciclo: [...new Set(grupo.map((x) => x.n_ciclo))].join(', '),
        n_codpla: String(grupo[0].n_codpla),
        docentes: [...new Set(grupo.map((x) => x.c_nomdoc))].join(', '),
        dias: horariosUnicos.map((h) => h.dia).join(', '),
        horas_inicio: horariosUnicos.map((h) => h.hini).join(', '),
        horas_fin: horariosUnicos.map((h) => h.hfin).join(', '),
        n_horas: [...new Set(grupo.map((x) => x.n_horas))].join(', '),
        c_tipo: String(grupo[0].tipo ?? ''),
        aula: String(grupo[0].c_codaula ?? ''),
        piso: String(grupo[0].n_piso ?? ''),
        pabellon: String(grupo[0].pabellon ?? ''),
      };
    });

    // console.log('agrupado => ', agrupado.length);
    return agrupado;
  }
}
