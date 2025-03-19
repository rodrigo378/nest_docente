import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHorarioDto } from './dto/createHorarioDto';
import { UpdateHorarioDto } from './dto/updateHorarioDto';

@Injectable()
export class HorarioService {
  constructor(private readonly prismaService: PrismaService) {}

  async createHorario(createHorarioDto: CreateHorarioDto) {
    try {
      for (const horario of createHorarioDto.horarios) {
        await this.prismaService.horario.create({
          data: {
            curso: horario.curso,
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
