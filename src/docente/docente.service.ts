import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocenteDto } from './dto/createDocenteDto';
import { UpdateDocenteDto } from './dto/updateDocenteDto';

@Injectable()
export class DocenteService {
  constructor(private readonly prismaService: PrismaService) {}

  async createDocente(createDocenteDto: CreateDocenteDto) {
    const docenteExistente = await this.prismaService.docente.findFirst({
      where: { email: createDocenteDto.email },
    });

    if (docenteExistente) {
      throw new ConflictException('Este email ya está en uso');
    }
    try {
      const docente = await this.prismaService.docente.create({
        data: {
          nombres: createDocenteDto.nombres,
          apellido_paterno: createDocenteDto.apellido_paterno,
          apellido_materno: createDocenteDto.apellido_materno,
          tipo_identificacion: createDocenteDto.tipo_identificacion,
          numero_identificacion: createDocenteDto.numero_identificacion,
          fecha_nacimiento: new Date(createDocenteDto.fecha_nacimiento),
          email: createDocenteDto.email,
          celular: createDocenteDto.celular,
          telefono_fijo: createDocenteDto.telefono_fijo || '',
          estado: 0,

          contactosEmergencia: {
            create: [
              {
                nombre: createDocenteDto.contactoEmergencia.nombre,
                relacion: createDocenteDto.contactoEmergencia.relacion,
                telefono_1: createDocenteDto.contactoEmergencia.telefono_1,
                telefono_2: createDocenteDto.contactoEmergencia.telefono_2,
              },
            ],
          },

          domicilios: {
            create: [
              {
                departamento_id: Number(
                  createDocenteDto.domicilio.departamento_id,
                ),
                provincia_id: Number(createDocenteDto.domicilio.provincia_id),
                distrito_id: Number(createDocenteDto.domicilio.distrito_id),
                direccion: createDocenteDto.domicilio.direccion,
                referencia: createDocenteDto.domicilio.referencia,
                mz: createDocenteDto.domicilio.mz,
                lote: createDocenteDto.domicilio.lote,
              },
            ],
          },

          formacionesAcademicas: {
            create: createDocenteDto.formacionAcademica?.map((fa) => ({
              grado_academico: fa.grado_academico,
              universidad: fa.universidad,
              especialidad: fa.especialidad,
              pais: fa.pais,
              resolucion_sunedu: fa.revalidacion,
            })),
          },

          titulosProfesionales: {
            create: createDocenteDto.titulosProfesionales?.map((tp) => ({
              titulo: tp.titulo,
              universidad: tp.universidad,
              especialidad: tp.especialidad,
            })),
          },

          formacionesComplementarias: {
            create: createDocenteDto.formacionComplementaria?.map((fc) => ({
              denominacion: fc.denominacion,
              especialidad: fc.especialidad,
              institucion: fc.institucion,
            })),
          },

          experienciasDocentes: {
            create: [
              ...(createDocenteDto.experienciaUniversitaria || []).map(
                (eu) => ({
                  institucion: eu.nombre_universidad,
                  curso_dictado: eu.curso_dictado,
                  semestre: eu.semestre,
                  pais: eu.pais,
                  tipo_experiencia: 0, // Universitario
                }),
              ),
              ...(createDocenteDto.experienciaNoUnivercitaria || []).map(
                (enu) => ({
                  institucion: enu.nombre_universidad,
                  curso_dictado: enu.curso_dictado,
                  semestre: enu.semestre,
                  pais: enu.pais,
                  tipo_experiencia: 1, // No Universitario
                }),
              ),
            ],
          },

          articulosCientificos: {
            create: createDocenteDto.articuloCientifico?.map((ac) => ({
              titulo_articulo: ac.nombre_articulo,
              nombre_revista: ac.nombre_revista,
              indizado: ac.indizado,
              año: ac.año,
              enlace: ac.enlace,
            })),
          },

          libros: {
            create: createDocenteDto.libros?.map((lib) => ({
              titulo: lib.libro_titulo,
              nombre_editorial: lib.nombre_editorial,
              año: lib.año,
            })),
          },

          proyectosInvestigacion: {
            create: createDocenteDto.proyectoInvestigacion?.map((pi) => ({
              nombre: pi.proyecto,
              entidad_financiadora: pi.entidad_financiera,
              año: pi.año_adjudicacion,
            })),
          },

          asesoriasJurados: {
            create: createDocenteDto.asesoriaJurado?.map((aj) => ({
              titulo_tesis: aj.titulo_tesis,
              universidad: aj.universidad,
              nivel: aj.nivel_tesis,
              año: aj.año,
              tipo: 0, // Asesor (0) o Jurado (1)
            })),
          },

          otros: {
            create: createDocenteDto.otros?.map((o) => ({
              idioma: o.idioma,
              nivel_idioma: o.nivel_idioma,
              office: o.office,
              nivel_office: o.nivel_office,
              elearning: o.learning,
              nivel_elearning: o.nivel_learning,
            })),
          },
        },
      });

      return {
        message: '✅ Docente creado exitosamente',
        data: docente,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('❌ Error al crear docente:', error.message);
        throw new Error(`No se pudo registrar el docente: ${error.message}`);
      }
      throw new Error(
        'No se pudo registrar el docente por un error desconocido',
      );
    }
  }

  async getDocente() {
    try {
      const docentes = await this.prismaService.docente.findMany();
      return { docentes };
    } catch (error) {
      if (error instanceof Error) {
        console.error('❌ Error al obtener docentes:', error.message);
        throw new Error(`No se pudo obtener los docentes: ${error.message}`);
      }
      throw new Error(
        'No se pudo obtener los docentes por un error desconocido',
      );
    }
  }

  async updateDocente(id: number, updateDocenteDto: UpdateDocenteDto) {
    // 🔍 Verificar si el docente existe
    const docente = await this.prismaService.docente.findUnique({
      where: { id },
    });

    if (!docente) {
      throw new NotFoundException('Docente no encontrado');
    }
    try {
      // 🔹 Actualizar datos del docente
      const updatedDocente = await this.prismaService.docente.update({
        where: { id },
        data: {
          nombres: updateDocenteDto.nombres,
          apellido_paterno: updateDocenteDto.apellido_paterno,
          apellido_materno: updateDocenteDto.apellido_materno,
          tipo_identificacion: updateDocenteDto.tipo_identificacion,
          numero_identificacion: updateDocenteDto.numero_identificacion,
          fecha_nacimiento: updateDocenteDto.fecha_nacimiento
            ? new Date(updateDocenteDto.fecha_nacimiento)
            : undefined,
          email: updateDocenteDto.email,
          celular: updateDocenteDto.celular,
          telefono_fijo: updateDocenteDto.telefono_fijo,
        },
      });

      // 🔹 Actualizar o crear Contacto de Emergencia (1:1)
      if (updateDocenteDto.contactoEmergencia) {
        await this.prismaService.contactoEmergencia.upsert({
          where: { id: Number(updateDocenteDto.contactoEmergencia.id) || 0 },
          update: {
            nombre: updateDocenteDto.contactoEmergencia.nombre,
            relacion: updateDocenteDto.contactoEmergencia.relacion,
            telefono_1: updateDocenteDto.contactoEmergencia.telefono_1,
            telefono_2: updateDocenteDto.contactoEmergencia.telefono_2,
          },
          create: {
            docente_id: id,
            nombre: updateDocenteDto.contactoEmergencia.nombre,
            relacion: updateDocenteDto.contactoEmergencia.relacion,
            telefono_1: updateDocenteDto.contactoEmergencia.telefono_1,
            telefono_2: updateDocenteDto.contactoEmergencia.telefono_2,
          },
        });
      }

      // 🔹 Actualizar Domicilios (1:N)
      if (updateDocenteDto.domicilios?.length) {
        for (const domicilio of updateDocenteDto.domicilios) {
          await this.prismaService.domicilio.upsert({
            where: { id: Number(domicilio.id) || 0 },
            update: {
              departamento_id: domicilio.departamento_id,
              provincia_id: domicilio.provincia_id,
              distrito_id: domicilio.distrito_id,
              direccion: domicilio.direccion,
              referencia: domicilio.referencia,
              mz: domicilio.mz,
              lote: domicilio.lote,
            },
            create: {
              docente_id: id,
              departamento_id: domicilio.departamento_id || 0,
              provincia_id: domicilio.provincia_id || 0,
              distrito_id: domicilio.distrito_id || 0,
              direccion: domicilio.direccion,
              referencia: domicilio.referencia,
              mz: domicilio.mz,
              lote: domicilio.lote,
            },
          });
        }
      }

      // 🔹 Actualizar Formación Académica (1:N)
      if (updateDocenteDto.formacionAcademica?.length) {
        for (const formacion of updateDocenteDto.formacionAcademica) {
          await this.prismaService.formacionAcademica.upsert({
            where: { id: Number(formacion.id) || 0 },
            update: {
              grado_academico: formacion.grado_academico,
              universidad: formacion.universidad,
              especialidad: formacion.especialidad,
              pais: formacion.pais,
              resolucion_sunedu: formacion.revalidacion,
            },
            create: {
              docente_id: id,
              grado_academico: formacion.grado_academico,
              universidad: formacion.universidad,
              especialidad: formacion.especialidad,
              pais: formacion.pais,
              resolucion_sunedu: formacion.revalidacion,
            },
          });
        }
      }

      if (updateDocenteDto.titulosProfesionales?.length) {
        for (const titulo of updateDocenteDto.titulosProfesionales) {
          await this.prismaService.tituloProfesional.upsert({
            where: { id: Number(titulo.id) || 0 },
            update: {
              titulo: titulo.titulo,
              universidad: titulo.universidad,
              especialidad: titulo.especialidad,
            },
            create: {
              docente_id: id,
              titulo: titulo.titulo,
              universidad: titulo.universidad,
              especialidad: titulo.especialidad,
            },
          });
        }
      }

      // 🔹 Actualizar Formación Complementaria (1:N)
      if (updateDocenteDto.formacionComplementaria?.length) {
        for (const formacion of updateDocenteDto.formacionComplementaria) {
          await this.prismaService.formacionComplementaria.upsert({
            where: { id: Number(formacion.id) || 0 },
            update: {
              denominacion: formacion.denominacion,
              especialidad: formacion.especialidad,
              institucion: formacion.institucion,
            },
            create: {
              docente_id: id,
              denominacion: formacion.denominacion,
              especialidad: formacion.especialidad,
              institucion: formacion.institucion,
            },
          });
        }
      }

      // 🔹 Actualizar Experiencia Docente (1:N)
      const experiencias = [
        ...(updateDocenteDto.experienciaUniversitaria || []).map((exp) => ({
          ...exp,
          tipo_experiencia: 0, // Universitaria
        })),
        ...(updateDocenteDto.experienciaNoUnivercitaria || []).map((exp) => ({
          ...exp,
          tipo_experiencia: 1, // No Universitaria
        })),
      ];

      for (const experiencia of experiencias) {
        await this.prismaService.experienciaDocente.upsert({
          where: { id: Number(experiencia.id) || 0 },
          update: {
            institucion: experiencia.nombre_universidad,
            curso_dictado: experiencia.curso_dictado,
            semestre: experiencia.semestre,
            pais: experiencia.pais,
            tipo_experiencia: experiencia.tipo_experiencia,
          },
          create: {
            docente_id: id,
            institucion: experiencia.nombre_universidad,
            curso_dictado: experiencia.curso_dictado,
            semestre: experiencia.semestre,
            pais: experiencia.pais,
            tipo_experiencia: experiencia.tipo_experiencia,
          },
        });
      }

      // 🔹 Actualizar Artículos Científicos (1:N)
      if (updateDocenteDto.articuloCientifico?.length) {
        for (const articulo of updateDocenteDto.articuloCientifico) {
          await this.prismaService.articuloCientifico.upsert({
            where: { id: Number(articulo.id) || 0 },
            update: {
              titulo_articulo: articulo.nombre_articulo,
              nombre_revista: articulo.nombre_revista,
              indizado: articulo.indizado,
              año: articulo.año,
              enlace: articulo.enlace,
            },
            create: {
              docente_id: id,
              titulo_articulo: articulo.nombre_articulo,
              nombre_revista: articulo.nombre_revista,
              indizado: articulo.indizado,
              año: articulo.año,
              enlace: articulo.enlace,
            },
          });
        }
      }

      // 🔹 Actualizar Libros (1:N)
      if (updateDocenteDto.libros?.length) {
        for (const libro of updateDocenteDto.libros) {
          await this.prismaService.libro.upsert({
            where: { id: Number(libro.id) || 0 },
            update: {
              titulo: libro.libro_titulo,
              nombre_editorial: libro.nombre_editorial,
              año: libro.año,
            },
            create: {
              docente_id: id,
              titulo: libro.libro_titulo,
              nombre_editorial: libro.nombre_editorial,
              año: libro.año,
            },
          });
        }
      }

      // 🔹 Actualizar Proyectos de Investigación (1:N)
      if (updateDocenteDto.proyectoInvestigacion?.length) {
        for (const proyecto of updateDocenteDto.proyectoInvestigacion) {
          await this.prismaService.proyectoInvestigacion.upsert({
            where: { id: Number(proyecto.id) || 0 },
            update: {
              nombre: proyecto.proyecto,
              entidad_financiadora: proyecto.entidad_financiera,
              año: proyecto.año_adjudicacion,
            },
            create: {
              docente_id: id,
              nombre: proyecto.proyecto,
              entidad_financiadora: proyecto.entidad_financiera,
              año: proyecto.año_adjudicacion,
            },
          });
        }
      }

      // 🔹 Actualizar Asesorías y Jurados (1:N)
      if (updateDocenteDto.asesoriaJurado?.length) {
        for (const asesoria of updateDocenteDto.asesoriaJurado) {
          await this.prismaService.asesoriaJurado.upsert({
            where: { id: Number(asesoria.id) || 0 },
            update: {
              titulo_tesis: asesoria.titulo_tesis,
              universidad: asesoria.universidad,
              nivel: asesoria.nivel_tesis,
              año: asesoria.año,
              tipo: 0, // Asesor (0) o Jurado (1)
            },
            create: {
              docente_id: id,
              titulo_tesis: asesoria.titulo_tesis,
              universidad: asesoria.universidad,
              nivel: asesoria.nivel_tesis,
              año: asesoria.año,
              tipo: 0, // Asesor (0) o Jurado (1)
            },
          });
        }
      }

      // 🔹 Actualizar Otros Conocimientos (1:N)
      if (updateDocenteDto.otros?.length) {
        for (const otro of updateDocenteDto.otros) {
          await this.prismaService.otros.upsert({
            where: { id: Number(otro.id) || 0 },
            update: {
              idioma: otro.idioma,
              nivel_idioma: otro.nivel_idioma,
              office: otro.office,
              nivel_office: otro.nivel_office,
              elearning: otro.learning,
              nivel_elearning: otro.nivel_learning,
            },
            create: {
              docente_id: id,
              idioma: otro.idioma,
              nivel_idioma: otro.nivel_idioma,
              office: otro.office,
              nivel_office: otro.nivel_office,
              elearning: otro.learning,
              nivel_elearning: otro.nivel_learning,
            },
          });
        }
      }

      return {
        message: '✅ Docente actualizado exitosamente',
        data: updatedDocente,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('❌ Error al actualizar docente:', error.message);
        throw new Error(`No se pudo actualizar el docente: ${error.message}`);
      }
      throw new Error(
        'No se pudo actualizar el docente por un error desconocido',
      );
    }
  }
}
