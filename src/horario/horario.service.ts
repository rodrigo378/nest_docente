import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHorarioDto } from './dto/createHorarioDto';
import { UpdateHorarioDto } from './dto/updateHorarioDto';

@Injectable()
export class HorarioService {
  constructor(private readonly prismaService: PrismaService) {}

  private validarCrucesHorarios(
    nuevosHorarios: {
      dia: string;
      h_inicio: string;
      h_fin: string;
      ciclo: string;
      seccion: string;
      curso: string;
    }[],
    existentesHorarios: {
      dia: string;
      h_inicio: string;
      h_fin: string;
      ciclo: string;
      seccion: string;
      curso: string;
    }[],
  ): boolean {
    for (const nuevo of nuevosHorarios) {
      const { dia, h_inicio, h_fin, ciclo, seccion, curso } = nuevo;

      const inicioNuevo: Date = new Date(
        `2025-01-01T${h_inicio.split('T')[1].substring(0, 8)}Z`,
      );
      const finNuevo: Date = new Date(
        `2025-01-01T${h_fin.split('T')[1].substring(0, 8)}Z`,
      );

      for (const existente of existentesHorarios) {
        if (
          existente.dia === dia &&
          existente.ciclo === ciclo &&
          existente.seccion === seccion
        ) {
          const inicioExistente: Date = new Date(
            `2025-01-01T${existente.h_inicio.split('T')[1].substring(0, 8)}Z`,
          );
          const finExistente: Date = new Date(
            `2025-01-01T${existente.h_fin.split('T')[1].substring(0, 8)}Z`,
          );

          // Verifica si hay solapamiento
          if (inicioNuevo < finExistente && finNuevo > inicioExistente) {
            console.log(
              `❌ Conflicto entre "${curso}" (${h_inicio} - ${h_fin}) y "${existente.curso}" (${existente.h_inicio} - ${existente.h_fin}) en el día ${dia}`,
            );
            return false;
          }
        }
      }
    }
    return true; // ✅ No hay cruces
  }

  async createHorario(createHorarioDto: CreateHorarioDto) {
    try {
      for (const horario of createHorarioDto.horarios) {
        await this.prismaService.horario.create({
          data: {
            curso: horario.curso,
            dia: horario.dia,
            h_inicio: new Date(horario.h_inicio),
            h_fin: new Date(horario.h_fin),
            color: horario.color,
            docente: horario.docente,
            ciclo: horario.ciclo,
            seccion: horario.seccion,
            carrera: horario.carrera,
          },
        });
      }

      return {
        message: 'Horarios creados con éxito',
      };
    } catch (error) {
      console.error('Error al crear horarios:', error);
      throw new Error('Error al crear los horarios');
    }
  }

  async getHorarios(ciclo: string, seccion: string) {
    try {
      return this.prismaService.horario.findMany({
        where: { ciclo, seccion },
      });
    } catch (error) {
      console.error('❌ Error al obtener horarios:', error);
      throw new Error('Error al recuperar los horarios');
    }
  }

  async updateHorario(updateHorarioDto: UpdateHorarioDto) {
    try {
      for (const horario of updateHorarioDto.horarios) {
        if (!horario.id) {
          // Si el ID es null o undefined, crea un nuevo horario
          await this.prismaService.horario.create({
            data: {
              curso: horario.curso || '',
              dia: horario.dia || '',
              h_inicio: horario.h_inicio ? new Date(horario.h_inicio) : '',
              h_fin: horario.h_fin ? new Date(horario.h_fin) : '',
              color: horario.color || '',
              docente: horario.docente || '',
              ciclo: horario.ciclo || '',
              seccion: horario.seccion || '',
              carrera: horario.carrera || '',
            },
          });
        } else {
          // Si el ID existe, actualiza el horario
          await this.prismaService.horario.update({
            where: { id: horario.id },
            data: {
              curso: horario.curso,
              dia: horario.dia,
              h_inicio: horario.h_inicio
                ? new Date(horario.h_inicio)
                : undefined,
              h_fin: horario.h_fin ? new Date(horario.h_fin) : undefined,
              color: horario.color,
              docente: horario.docente,
              ciclo: horario.ciclo,
              seccion: horario.seccion,
              carrera: horario.carrera,
            },
          });
        }
      }

      return { message: 'Horarios procesados con éxito' };
    } catch (error) {
      console.error('❌ Error al procesar horarios:', error);
      throw new Error('Error al actualizar o crear los horarios');
    }
  }

  async deleteHorario(id: number) {
    try {
      await this.prismaService.horario.delete({ where: { id } });
      return { message: 'Horario borrado' };
    } catch (error) {
      console.error('❌ Error al borrar horario:', error);
      throw new Error('Error al borrar los horario');
    }
  }
}

// a1 a2
// 10 12

// b1 b2
// 11 13

// 10 < 13
// a1 < b2
// a1 < b1
