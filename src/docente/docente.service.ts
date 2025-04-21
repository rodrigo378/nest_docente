import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocenteDto } from './dto/createDocenteDto';
import { UpdateDocenteDto } from './dto/updateDocenteDto';

@Injectable()
export class DocenteService {
  constructor(private readonly prismaService: PrismaService) {}

  // async createDocente(createDocenteDto: CreateDocenteDto, user_id: string) {
  //   const docenteExistente = await this.prismaService.docente.findFirst({
  //     where: { email: createDocenteDto.email },
  //   });

  //   if (docenteExistente) {
  //     throw new ConflictException('Este email ya está en uso');
  //   }
  //   try {
  //     const docente = await this.prismaService.docente.create({
  //       data: {
  //         user_id: user_id,
  //         nombres: createDocenteDto.nombres,
  //         apellido_paterno: createDocenteDto.apellido_paterno,
  //         apellido_materno: createDocenteDto.apellido_materno,
  //         tipo_identificacion: createDocenteDto.tipo_identificacion,
  //         numero_identificacion: createDocenteDto.numero_identificacion,
  //         fecha_nacimiento: new Date(createDocenteDto.fecha_nacimiento),
  //         email: createDocenteDto.email,
  //         celular: createDocenteDto.celular,
  //         telefono_fijo: createDocenteDto.telefono_fijo || '',
  //         estado: 0,

  //         contactoEmergencia: {
  //           create: {
  //             nombre: createDocenteDto.contactoEmergencia.nombre,
  //             relacion: createDocenteDto.contactoEmergencia.relacion,
  //             telefono_1: createDocenteDto.contactoEmergencia.telefono_1,
  //             telefono_2: createDocenteDto.contactoEmergencia.telefono_2,
  //           },
  //         },

  //         domicilio: {
  //           create: {
  //             departamento_id: Number(
  //               createDocenteDto.domicilio.departamento_id,
  //             ),
  //             provincia_id: Number(createDocenteDto.domicilio.provincia_id),
  //             distrito_id: Number(createDocenteDto.domicilio.distrito_id),
  //             direccion: createDocenteDto.domicilio.direccion,
  //             referencia: createDocenteDto.domicilio.referencia,
  //             mz: createDocenteDto.domicilio.mz,
  //             lote: createDocenteDto.domicilio.lote,
  //           },
  //         },

  //         formacionesAcademicas: {
  //           create: createDocenteDto.formacionAcademica?.map((fa) => ({
  //             grado_academico: fa.grado_academico,
  //             universidad: fa.universidad,
  //             especialidad: fa.especialidad,
  //             pais: fa.pais,
  //             resolucion_sunedu: fa.resolucion_sunedu,
  //           })),
  //         },

  //         titulosProfesionales: {
  //           create: createDocenteDto.titulosProfesionales?.map((tp) => ({
  //             titulo: tp.titulo,
  //             universidad: tp.universidad,
  //             especialidad: tp.especialidad,
  //           })),
  //         },

  //         formacionesComplementarias: {
  //           create: createDocenteDto.formacionComplementaria?.map((fc) => ({
  //             denominacion: fc.denominacion,
  //             especialidad: fc.especialidad,
  //             institucion: fc.institucion,
  //           })),
  //         },

  //         experienciasDocentes: {
  //           create: createDocenteDto.experienciaDocente?.map((exp) => ({
  //             institucion: exp.institucion,
  //             curso_dictado: exp.curso_dictado,
  //             semestre: exp.semestre,
  //             pais: exp.pais,
  //             tipo_experiencia: Number(exp.tipo_experiencia) || 0,
  //           })),
  //         },

  //         articulosCientificos: {
  //           create: createDocenteDto.articuloCientifico?.map((ac) => ({
  //             titulo_articulo: ac.titulo_articulo,
  //             nombre_revista: ac.nombre_revista,
  //             indizado: ac.indizado,
  //             año: ac.año,
  //             enlace: ac.enlace,
  //           })),
  //         },

  //         libros: {
  //           create: createDocenteDto.libros?.map((lib) => ({
  //             titulo: lib.libro_titulo,
  //             nombre_editorial: lib.nombre_editorial,
  //             año: lib.año,
  //           })),
  //         },

  //         proyectosInvestigacion: {
  //           create: createDocenteDto.proyectoInvestigacion?.map((pi) => ({
  //             nombre: pi.nombre,
  //             entidad_financiadora: pi.entidad_financiera,
  //             año: pi.año,
  //           })),
  //         },

  //         asesoriasJurados: {
  //           create: createDocenteDto.asesoriaJurado?.map((aj) => ({
  //             titulo_tesis: aj.titulo_tesis,
  //             universidad: aj.universidad,
  //             nivel: aj.nivel,
  //             año: aj.año,
  //             tipo: Number(aj.tipo) || 0,
  //           })),
  //         },

  //         otros: {
  //           create: createDocenteDto.otros?.map((o) => ({
  //             idioma: o.idioma,
  //             nivel_idioma: o.nivel_idioma,
  //             office: o.office,
  //             nivel_office: o.nivel_office,
  //             elearning: o.learning,
  //             nivel_elearning: o.nivel_learning,
  //           })),
  //         },
  //       },
  //     });

  //     return {
  //       message: '✅ Docente creado exitosamente',
  //       data: docente,
  //     };
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       console.error('❌ Error al crear docente:', error.message);
  //       throw new Error(`No se pudo registrar el docente: ${error.message}`);
  //     }
  //     throw new Error(
  //       'No se pudo registrar el docente por un error desconocido',
  //     );
  //   }
  // }

  // async updateDocente(id: number, updateDocenteDto: UpdateDocenteDto) {
  //   // 🔍 Verificar si el docente existe
  //   const docente = await this.prismaService.docente.findUnique({
  //     where: { id },
  //   });

  //   if (!docente) {
  //     throw new NotFoundException('Docente no encontrado');
  //   }
  //   try {
  //     // 🔹 Actualizar datos del docente
  //     const updatedDocente = await this.prismaService.docente.update({
  //       where: { id },
  //       data: {
  //         nombres: updateDocenteDto.nombres,
  //         apellido_paterno: updateDocenteDto.apellido_paterno,
  //         apellido_materno: updateDocenteDto.apellido_materno,
  //         tipo_identificacion: updateDocenteDto.tipo_identificacion,
  //         numero_identificacion: updateDocenteDto.numero_identificacion,
  //         fecha_nacimiento: updateDocenteDto.fecha_nacimiento
  //           ? new Date(updateDocenteDto.fecha_nacimiento)
  //           : undefined,
  //         email: updateDocenteDto.email,
  //         celular: updateDocenteDto.celular,
  //         telefono_fijo: updateDocenteDto.telefono_fijo,
  //       },
  //     });

  //     // 🔹 Actualizar o crear Contacto de Emergencia (1:1)
  //     if (updateDocenteDto.contactoEmergencia) {
  //       await this.prismaService.contactoEmergencia.upsert({
  //         where: { id: Number(updateDocenteDto.contactoEmergencia.id) || 0 },
  //         update: {
  //           nombre: updateDocenteDto.contactoEmergencia.nombre,
  //           relacion: updateDocenteDto.contactoEmergencia.relacion,
  //           telefono_1: updateDocenteDto.contactoEmergencia.telefono_1,
  //           telefono_2: updateDocenteDto.contactoEmergencia.telefono_2,
  //         },
  //         create: {
  //           docente_id: id,
  //           nombre: updateDocenteDto.contactoEmergencia.nombre,
  //           relacion: updateDocenteDto.contactoEmergencia.relacion,
  //           telefono_1: updateDocenteDto.contactoEmergencia.telefono_1,
  //           telefono_2: updateDocenteDto.contactoEmergencia.telefono_2,
  //         },
  //       });
  //     }

  //     // 🔹 Actualizar Domicilios (1:N)
  //     if (updateDocenteDto.domicilio) {
  //       await this.prismaService.domicilio.upsert({
  //         where: { id: Number(updateDocenteDto.domicilio.id) || 0 },
  //         update: {
  //           departamento_id: updateDocenteDto.domicilio.departamento_id,
  //           provincia_id: updateDocenteDto.domicilio.provincia_id,
  //           distrito_id: updateDocenteDto.domicilio.distrito_id,
  //           direccion: updateDocenteDto.domicilio.direccion,
  //           referencia: updateDocenteDto.domicilio.referencia,
  //           mz: updateDocenteDto.domicilio.mz,
  //           lote: updateDocenteDto.domicilio.lote,
  //         },
  //         create: {
  //           docente_id: id,
  //           departamento_id: updateDocenteDto.domicilio.departamento_id || 0,
  //           provincia_id: updateDocenteDto.domicilio.provincia_id || 0,
  //           distrito_id: updateDocenteDto.domicilio.distrito_id || 0,
  //           direccion: updateDocenteDto.domicilio.direccion,
  //           referencia: updateDocenteDto.domicilio.referencia,
  //           mz: updateDocenteDto.domicilio.mz,
  //           lote: updateDocenteDto.domicilio.lote,
  //         },
  //       });
  //     }

  //     // 🔹 Actualizar Formación Académica (1:N)
  //     if (updateDocenteDto.formacionAcademica?.length) {
  //       for (const formacion of updateDocenteDto.formacionAcademica) {
  //         await this.prismaService.formacionAcademica.upsert({
  //           where: { id: Number(formacion.id) || 0 },
  //           update: {
  //             grado_academico: formacion.grado_academico,
  //             universidad: formacion.universidad,
  //             especialidad: formacion.especialidad,
  //             pais: formacion.pais,
  //             resolucion_sunedu: formacion.resolucion_sunedu,
  //           },
  //           create: {
  //             docente_id: id,
  //             grado_academico: formacion.grado_academico,
  //             universidad: formacion.universidad,
  //             especialidad: formacion.especialidad,
  //             pais: formacion.pais,
  //             resolucion_sunedu: formacion.resolucion_sunedu,
  //           },
  //         });
  //       }
  //     }

  //     if (updateDocenteDto.titulosProfesionales?.length) {
  //       for (const titulo of updateDocenteDto.titulosProfesionales) {
  //         await this.prismaService.tituloProfesional.upsert({
  //           where: { id: Number(titulo.id) || 0 },
  //           update: {
  //             titulo: titulo.titulo,
  //             universidad: titulo.universidad,
  //             especialidad: titulo.especialidad,
  //           },
  //           create: {
  //             docente_id: id,
  //             titulo: titulo.titulo,
  //             universidad: titulo.universidad,
  //             especialidad: titulo.especialidad,
  //           },
  //         });
  //       }
  //     }

  //     // 🔹 Actualizar Formación Complementaria (1:N)
  //     if (updateDocenteDto.formacionComplementaria?.length) {
  //       for (const formacion of updateDocenteDto.formacionComplementaria) {
  //         await this.prismaService.formacionComplementaria.upsert({
  //           where: { id: Number(formacion.id) || 0 },
  //           update: {
  //             denominacion: formacion.denominacion,
  //             especialidad: formacion.especialidad,
  //             institucion: formacion.institucion,
  //           },
  //           create: {
  //             docente_id: id,
  //             denominacion: formacion.denominacion,
  //             especialidad: formacion.especialidad,
  //             institucion: formacion.institucion,
  //           },
  //         });
  //       }
  //     }

  //     // 🔹 Actualizar Experiencia Docente (1:N)
  //     for (const experiencia of updateDocenteDto.experienciaDocente || []) {
  //       await this.prismaService.experienciaDocente.upsert({
  //         where: { id: Number(experiencia.id) || 0 },
  //         update: {
  //           institucion: experiencia.nombre_universidad,
  //           curso_dictado: experiencia.curso_dictado,
  //           semestre: experiencia.semestre,
  //           pais: experiencia.pais,
  //           tipo_experiencia: experiencia.tipo_experiencia,
  //         },
  //         create: {
  //           docente_id: id,
  //           institucion: experiencia.nombre_universidad,
  //           curso_dictado: experiencia.curso_dictado,
  //           semestre: experiencia.semestre,
  //           pais: experiencia.pais,
  //           tipo_experiencia: experiencia.tipo_experiencia || 0,
  //         },
  //       });
  //     }

  //     // 🔹 Actualizar Artículos Científicos (1:N)
  //     if (updateDocenteDto.articuloCientifico?.length) {
  //       for (const articulo of updateDocenteDto.articuloCientifico) {
  //         await this.prismaService.articuloCientifico.upsert({
  //           where: { id: Number(articulo.id) || 0 },
  //           update: {
  //             titulo_articulo: articulo.titulo_articulo,
  //             nombre_revista: articulo.nombre_revista,
  //             indizado: articulo.indizado,
  //             año: articulo.año,
  //             enlace: articulo.enlace,
  //           },
  //           create: {
  //             docente_id: id,
  //             titulo_articulo: articulo.titulo_articulo,
  //             nombre_revista: articulo.nombre_revista,
  //             indizado: articulo.indizado,
  //             año: articulo.año,
  //             enlace: articulo.enlace,
  //           },
  //         });
  //       }
  //     }

  //     // 🔹 Actualizar Libros (1:N)
  //     if (updateDocenteDto.libros?.length) {
  //       for (const libro of updateDocenteDto.libros) {
  //         await this.prismaService.libro.upsert({
  //           where: { id: Number(libro.id) || 0 },
  //           update: {
  //             titulo: libro.libro_titulo,
  //             nombre_editorial: libro.nombre_editorial,
  //             año: libro.año,
  //           },
  //           create: {
  //             docente_id: id,
  //             titulo: libro.libro_titulo,
  //             nombre_editorial: libro.nombre_editorial,
  //             año: libro.año,
  //           },
  //         });
  //       }
  //     }

  //     // 🔹 Actualizar Proyectos de Investigación (1:N)
  //     if (updateDocenteDto.proyectoInvestigacion?.length) {
  //       for (const proyecto of updateDocenteDto.proyectoInvestigacion) {
  //         await this.prismaService.proyectoInvestigacion.upsert({
  //           where: { id: Number(proyecto.id) || 0 },
  //           update: {
  //             nombre: proyecto.nombre,
  //             entidad_financiadora: proyecto.entidad_financiera,
  //             año: proyecto.año,
  //           },
  //           create: {
  //             docente_id: id,
  //             nombre: proyecto.nombre,
  //             entidad_financiadora: proyecto.entidad_financiera,
  //             año: proyecto.año,
  //           },
  //         });
  //       }
  //     }

  //     // 🔹 Actualizar Asesorías y Jurados (1:N)
  //     if (updateDocenteDto.asesoriaJurado?.length) {
  //       for (const asesoria of updateDocenteDto.asesoriaJurado) {
  //         await this.prismaService.asesoriaJurado.upsert({
  //           where: { id: Number(asesoria.id) || 0 },
  //           update: {
  //             titulo_tesis: asesoria.titulo_tesis,
  //             universidad: asesoria.universidad,
  //             nivel: asesoria.nivel,
  //             año: asesoria.año,
  //             tipo: asesoria.tipo, // Asesor (0) o Jurado (1)
  //           },
  //           create: {
  //             docente_id: id,
  //             titulo_tesis: asesoria.titulo_tesis,
  //             universidad: asesoria.universidad,
  //             nivel: asesoria.nivel,
  //             año: asesoria.año,
  //             tipo: asesoria.tipo || 0, // Asesor (0) o Jurado (1)
  //           },
  //         });
  //       }
  //     }

  //     // 🔹 Actualizar Otros Conocimientos (1:N)
  //     if (updateDocenteDto.otros?.length) {
  //       for (const otro of updateDocenteDto.otros) {
  //         await this.prismaService.otros.upsert({
  //           where: { id: Number(otro.id) || 0 },
  //           update: {
  //             idioma: otro.idioma,
  //             nivel_idioma: otro.nivel_idioma,
  //             office: otro.office,
  //             nivel_office: otro.nivel_office,
  //             elearning: otro.learning,
  //             nivel_elearning: otro.nivel_learning,
  //           },
  //           create: {
  //             docente_id: id,
  //             idioma: otro.idioma,
  //             nivel_idioma: otro.nivel_idioma,
  //             office: otro.office,
  //             nivel_office: otro.nivel_office,
  //             elearning: otro.learning,
  //             nivel_elearning: otro.nivel_learning,
  //           },
  //         });
  //       }
  //     }

  //     return {
  //       message: '✅ Docente actualizado exitosamente',
  //       data: updatedDocente,
  //     };
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       console.error('❌ Error al actualizar docente:', error.message);
  //       throw new Error(`No se pudo actualizar el docente: ${error.message}`);
  //     }
  //     throw new Error(
  //       'No se pudo actualizar el docente por un error desconocido',
  //     );
  //   }
  // }

  // async getDocentes() {
  //   try {
  //     const docentes = await this.prismaService.docente.findMany();
  //     return { docentes };
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.error('❌ Error al obtener docentes:', error.message);
  //       throw new Error(`No se pudo obtener los docentes: ${error.message}`);
  //     }
  //     throw new Error(
  //       'No se pudo obtener los docentes por un error desconocido',
  //     );
  //   }
  // }

  // async getDocente(id: number) {
  //   try {
  //     const docente = await this.prismaService.docente.findUnique({
  //       where: { id },
  //       include: {
  //         contactoEmergencia: true,
  //         domicilio: true,
  //         formacionesAcademicas: true,
  //         titulosProfesionales: true,
  //         formacionesComplementarias: true,
  //         experienciasDocentes: true,
  //         articulosCientificos: true,
  //         libros: true,
  //         proyectosInvestigacion: true,
  //         asesoriasJurados: true,
  //         otros: true,
  //       },
  //     });

  //     if (!docente) {
  //       throw new Error('Docente no encontrado');
  //     }

  //     return { docente };
  //   } catch (error) {
  //     console.error('❌ Error al obtener el docente:', error);
  //     throw new Error(`No se pudo obtener el docente: ${error}`);
  //   }
  // }

  // async getDocenteUser(user_id: string) {
  //   try {
  //     const docente = await this.prismaService.docente.findUnique({
  //       where: { user_id },
  //       include: {
  //         contactoEmergencia: true,
  //         domicilio: true,
  //         formacionesAcademicas: true,
  //         titulosProfesionales: true,
  //         formacionesComplementarias: true,
  //         experienciasDocentes: true,
  //         articulosCientificos: true,
  //         libros: true,
  //         proyectosInvestigacion: true,
  //         asesoriasJurados: true,
  //         otros: true,
  //       },
  //     });

  //     if (!docente) {
  //       throw new NotFoundException('No se encontró información del docente.');
  //     }

  //     return docente;
  //   } catch (error) {
  //     console.error('❌ Error al obtener la información del docente:', error);
  //     throw new InternalServerErrorException(
  //       'Ocurrió un error al obtener la información del docente.',
  //     );
  //   }
  // }

  // async getDocentes(options: { includeHorario?: boolean } = {}) {
  //   const include: { Horario: boolean } = {
  //     Horario: false,
  //   };

  //   if (options.includeHorario) {
  //     include.Horario = true;
  //   }

  //   return this.prismaService.docente.findMany({
  //     include: Object.keys(include).length > 0 ? include : undefined,
  //   });
  // }

  async createDocente(createDocenteDto: CreateDocenteDto) {
    const { c_codfac, nom_fac, c_nomdoc, h_min, h_max, tipo } =
      createDocenteDto;

    const newDocente = await this.prismaService.docente.create({
      data: {
        c_codfac,
        nom_fac,
        c_nomdoc,
        h_min,
        h_max,
        tipo,
      },
    });

    return { message: 'Docente creado', docente: newDocente };
  }

  async getDocentes(
    horario: boolean = false,
    curso: boolean = false,
    aula: boolean = false,
  ) {
    const include: { Horario: any } = { Horario: false };

    if (horario) {
      include.Horario = {
        orderBy: { id: 'desc' },
        distinct: ['dia', 'h_inicio', 'h_fin'],
        select: {
          id: true,
          dia: true,
          h_inicio: true,
          h_fin: true,
          n_horas: true,
          tipo: true,
          curso: curso ? { include: { cursosPadres: true } } : false,
          aula: aula ? true : false,
        },
      };
    }

    return this.prismaService.docente.findMany({ include });
  }

  async getDocente(
    id: number,
    horario: boolean = false,
    curso: boolean = false,
    aula: boolean = false,
  ) {
    const include: { Horario: any } = { Horario: false };

    if (horario) {
      include.Horario = {
        orderBy: { id: 'desc' },
        distinct: ['dia', 'h_inicio', 'h_fin'],
        select: {
          id: true,
          dia: true,
          h_inicio: true,
          h_fin: true,
          n_horas: true,
          tipo: true,
          curso: curso ? { include: { cursosPadres: true } } : false,
          aula: aula ? true : false,
        },
      };
    }

    return this.prismaService.docente.findMany({ where: { id }, include });
  }

  async updateDocente(updateDocenteDto: UpdateDocenteDto) {
    const docente = await this.prismaService.docente.findUnique({
      where: { id: updateDocenteDto.id },
    });

    if (!docente) {
      throw new NotFoundException(
        `Docente con id ${updateDocenteDto.id} no encontrado`,
      );
    }

    const updatedDocente = await this.prismaService.docente.update({
      where: { id: updateDocenteDto.id },
      data: {
        ...updateDocenteDto,
      },
    });

    return {
      message: 'Docente actualizado correctamente',
      docente: updatedDocente,
    };
  }

  async getHorasPorDocente() {
    const docentes = await this.prismaService.docente.findMany({
      select: {
        c_nomdoc: true,
        h_total: true,
      },
      orderBy: { h_total: 'desc' },
      skip: 0,
      take: 10,
    });

    const categories = docentes.map((d) => d.c_nomdoc);
    const data = docentes.map((d) => d.h_total);

    return { categories, data };
  }
}
