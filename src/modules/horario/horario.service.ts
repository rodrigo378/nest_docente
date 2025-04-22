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

@Injectable()
export class HorarioService {
  constructor(private readonly prismaService: PrismaService) {}

  async createHorarioAsync(createHorarioAsyncDto: CreateHorarioAsyncDto) {
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

    return {
      success: true,
      mensaje: '✅ Horario registrado exitosamente',
      curso_id: cursoCreado?.id,
      horario_id: horarioCreado.id,
      cursos_creados: cursosCreados,
    };
  }

  async createHorarioArray(createHorarioArray: CreateHorarioArrayDto) {
    const verificacion = await verificarCruzeCreate(
      this.prismaService,
      createHorarioArray,
    );

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

          const errores = await verificarCruzesCursosTransversales(
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
                  h_umaPlus: horario.h_umaPlus || null,
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
            h_umaPlus: horario.h_umaPlus || null,
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

  async updateHorarioArray(updateHorarioArrayDto: UpdateHorarioArrayDto) {
    const verificacion = await verificarCruzeUpdate(
      this.prismaService,
      updateHorarioArrayDto,
    );

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
        cursosCreados++;
      }

      // Caso transversal
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

        // 🔹 Actualizar carga docente solo una vez antes del deleteMany
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
              }
              if (nuevoDocenteId) {
                await this.prismaService.docente.update({
                  where: { id: nuevoDocenteId },
                  data: { h_total: { increment: nuevasHoras } },
                });
              }
            } else if (nuevoDocenteId && anterior?.n_horas != null) {
              const diferencia = nuevasHoras - anterior.n_horas;
              if (diferencia !== 0) {
                await this.prismaService.docente.update({
                  where: { id: nuevoDocenteId },
                  data: { h_total: { increment: diferencia } },
                });
              }
            }
          } else if (!horario.id && nuevoDocenteId) {
            await this.prismaService.docente.update({
              where: { id: nuevoDocenteId },
              data: { h_total: { increment: nuevasHoras } },
            });
          }
        }

        await this.prismaService.horario.deleteMany({
          where: {
            curso_id: { in: idCursos },
          },
        });

        for (const grupo of cursosAgrupados) {
          const cursoHijo = grupo.cursosHijo;

          for (const horario of horarios) {
            if (!horario.dia || !horario.h_inicio || !horario.h_fin) continue;

            await this.prismaService.horario.create({
              data: {
                dia: horario.dia,
                h_inicio: new Date(horario.h_inicio),
                h_fin: new Date(horario.h_fin),
                n_horas: horario.n_horas ?? 0,
                c_color: horario.c_color ?? '#000000',
                tipo: horario.tipo ?? 'Teoría',
                turno_id: cursoHijo.turno_id,
                curso_id: cursoHijo.id,
                aula_id: horario.aula_id ?? null,
                docente_id: horario.docente_id ?? null,
                h_umaPlus: horario.h_umaPlus,
              },
            });

            horariosCreados++;
          }
        }

        continue;
      }

      // Caso no-transversal: actualizar o crear normalmente
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
            }
            if (nuevoDocenteId) {
              await this.prismaService.docente.update({
                where: { id: nuevoDocenteId },
                data: { h_total: { increment: nuevasHoras } },
              });
            }
          } else if (nuevoDocenteId && anterior?.n_horas != null) {
            const diferencia = nuevasHoras - anterior.n_horas;
            if (diferencia !== 0) {
              await this.prismaService.docente.update({
                where: { id: nuevoDocenteId },
                data: { h_total: { increment: diferencia } },
              });
            }
          }

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
              h_umaPlus: horario.h_umaPlus ?? null,
            },
          });

          horariosActualizados++;
        } else {
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
              h_umaPlus: horario.h_umaPlus ?? null,
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
      }

      if (horario?.curso?.cursosPadres?.[0]?.tipo === 0) {
        const grupoCursos = await this.prismaService.grupo_sincro.findMany({
          where: {
            padre_curso_id: horario.curso.cursosPadres[0].padre_curso_id,
          },
        });

        const cursosIds = grupoCursos.map((g) => g.curso_id);
        await this.prismaService.horario.deleteMany({
          where: {
            curso_id: { in: cursosIds },
            h_inicio: horario.h_inicio,
            h_fin: horario.h_fin,
          },
        });
      } else {
        await this.prismaService.horario.delete({
          where: { id: horario_id },
        });
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

    // 8. Eliminar horarios anteriores de los hijos
    await this.prismaService.horario.deleteMany({
      where: { curso_id: { in: hijos_id } },
    });

    // 9. Clonar los horarios del padre a cada hijo
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
            curso_id: hijo_id,
            turno_id: cursoHijo?.turno_id || 0,
          },
        });
      }
    }

    return {
      mensaje: '✅ Cursos transversales asociados correctamente',
      shortname: finalShortname,
    };
  }

  async createCursoGrupo(createTransversalDto: CreateTransversalDto) {
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

    return {
      mensaje: '✅ Cursos grupo asociados correctamente',
      shortname,
    };
  }

  async deleteAgrupado(padre_curso_id: number) {
    const grupoIds = await this.prismaService.grupo_sincro.findMany({
      where: { padre_curso_id },
      select: { id: true, curso_id: true },
    });

    const ids = grupoIds.map((g) => g.id);
    const cursoIds = grupoIds.map((g) => g.curso_id);

    await this.prismaService.horario.deleteMany({
      where: { curso_id: { in: cursoIds } },
    });

    if (ids.length === 0) return;

    await this.prismaService.grupo_sincro.deleteMany({
      where: {
        id: { in: ids },
      },
    });

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
