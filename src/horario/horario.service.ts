import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteHorarioArrayDto } from './dto/deleteHorarioArrayDto';
import { AsignarCursoTransversalDto } from './dto/asignarHorarioTransversalDto';
import { CreateHorarioArrayDto } from './dto/createHorarioArrayDto';
import { UpdateHorarioArrayDto } from './dto/updateHorarioArrayDto';

@Injectable()
export class HorarioService {
  constructor(private readonly prismaService: PrismaService) {}

  parseHora(hora: Date | string): Date {
    const date = new Date(hora);
    return new Date(1970, 0, 1, date.getHours(), date.getMinutes(), 0, 0);
  }

  async verificarCruze(createHorarioArrayDto: CreateHorarioArrayDto) {
    const errores: string[] = [];
    const horarios = createHorarioArrayDto.horarios;

    // 🔹 1. Conflictos dentro del mismo body
    for (let i = 0; i < horarios.length; i++) {
      const h1 = horarios[i];
      const inicio1 = this.parseHora(h1.h_inicio);
      const fin1 = this.parseHora(h1.h_fin);

      for (let j = i + 1; j < horarios.length; j++) {
        const h2 = horarios[j];

        if (h1.dia !== h2.dia) continue;

        const inicio2 = this.parseHora(h2.h_inicio);
        const fin2 = this.parseHora(h2.h_fin);

        const cruceHoras = inicio1 < fin2 && fin1 > inicio2;

        // Solo comparar si ambos tienen aula/docente definidos
        const mismoAula = h1.aula_id && h2.aula_id && h1.aula_id === h2.aula_id;
        const mismoDocente =
          h1.docente_id && h2.docente_id && h1.docente_id === h2.docente_id;

        if (cruceHoras && (mismoAula || mismoDocente)) {
          errores.push(
            `⛔ Conflicto entre "${h1.c_nomcur}" y "${h2.c_nomcur}" el día ${h1.dia} ` +
              `(${mismoAula ? 'en la misma aula' : ''}${mismoAula && mismoDocente ? ' y ' : ''}${mismoDocente ? 'con el mismo docente' : ''})`,
          );
        }
      }
    }

    // 🔹 2. Conflictos con la base de datos
    for (const h of horarios) {
      const inicio1 = this.parseHora(h.h_inicio);
      const fin1 = this.parseHora(h.h_fin);

      // Construir condiciones OR dinámicamente
      const condicionesOR: any[] = [];
      if (h.aula_id) condicionesOR.push({ aula_id: h.aula_id });
      if (h.docente_id) condicionesOR.push({ docente_id: h.docente_id });

      if (condicionesOR.length === 0) continue;

      const horariosBd = await this.prismaService.horario.findMany({
        where: {
          dia: h.dia,
          OR: condicionesOR,
        },
      });

      for (const hb of horariosBd) {
        const inicio2 = this.parseHora(hb.h_inicio);
        const fin2 = this.parseHora(hb.h_fin);

        const cruceHoras = inicio1 < fin2 && fin1 > inicio2;

        const mismoAula = h.aula_id && hb.aula_id && h.aula_id === hb.aula_id;
        const mismoDocente =
          h.docente_id && hb.docente_id && h.docente_id === hb.docente_id;

        if (cruceHoras && (mismoAula || mismoDocente)) {
          const mismoTurno = h.turno_id === hb.turno_id;

          errores.push(
            `⛔ Conflicto con "${hb.c_nomcur}" (turno ${hb.turno_id}) el día ${h.dia} ` +
              `(${mismoAula ? 'misma aula' : ''}${mismoAula && mismoDocente ? ' y ' : ''}${mismoDocente ? 'mismo docente' : ''})` +
              `${!mismoTurno ? ' ⚠️ en diferente turno' : ''}`,
          );
        }
      }
    }

    return {
      success: errores.length === 0,
      errores,
    };
  }

  async createHorario(createHorarioArrayDto: CreateHorarioArrayDto) {
    const resultado = await this.verificarCruze(createHorarioArrayDto);

    if (!resultado.success) {
      throw new BadRequestException({
        message: '❌ No se puede registrar los horarios debido a conflictos',
        errores: resultado.errores,
      });
    }

    for (const horario of createHorarioArrayDto.horarios) {
      const {
        c_codcur,
        c_nomcur,
        dia,
        h_inicio,
        h_fin,
        n_horas,
        c_color,
        turno_id,
        aula_id,
        docente_id,
        n_codper,
        n_codper_equ,
        c_codmod_equ,
        c_codfac_equ,
        c_codesp_equ,
        c_codcur_equ,
        c_nomcur_equ,
      } = horario;

      // Validar solo si viene aula_id
      if (
        aula_id &&
        !(await this.prismaService.aula.findUnique({ where: { id: aula_id } }))
      ) {
        throw new NotFoundException('Esta aula no existe');
      }

      // Validar solo si viene docente_id
      if (
        docente_id &&
        !(await this.prismaService.docente.findUnique({
          where: { id: docente_id },
        }))
      ) {
        throw new NotFoundException('Este docente no existe');
      }

      await this.prismaService.horario.create({
        data: {
          n_codper,
          c_codcur,
          c_nomcur,
          dia,
          h_inicio: new Date(h_inicio),
          h_fin: new Date(h_fin),
          n_horas,
          c_color,
          turno_id,
          aula_id: aula_id ?? null,
          docente_id: docente_id ?? null,
          n_codper_equ,
          c_codmod_equ,
          c_codfac_equ,
          c_codesp_equ,
          c_codcur_equ,
          c_nomcur_equ,
        },
      });
    }

    return {
      message: '✅ Horarios creados con éxito',
      cantidad: createHorarioArrayDto.horarios.length,
    };
  }

  async updateHorario(updateHorarioArrayDto: UpdateHorarioArrayDto) {
    const resultados: { tipo: string; horario: any }[] = [];

    for (const horario of updateHorarioArrayDto.horarios) {
      const {
        id,
        c_codcur,
        c_nomcur,
        dia,
        h_inicio,
        h_fin,
        n_horas,
        c_color,
        turno_id,
        aula_id,
        docente_id,
        n_codper,
        n_codper_equ,
        c_codmod_equ,
        c_codfac_equ,
        c_codesp_equ,
        c_codcur_equ,
        c_nomcur_equ,
      } = horario;

      if (id) {
        const existe = await this.prismaService.horario.findUnique({
          where: { id },
        });

        if (existe) {
          const actualizado = await this.prismaService.horario.update({
            where: { id },
            data: {
              dia,
              h_inicio,
              h_fin,
              n_horas,
              c_color,
              aula_id,
              docente_id,
            },
          });
          resultados.push({ tipo: 'actualizado', horario: actualizado });
          continue;
        }
      }

      const creado = await this.prismaService.horario.create({
        data: {
          n_codper,
          c_codcur,
          c_nomcur,
          dia,
          h_inicio,
          h_fin,
          n_horas,
          c_color,
          turno_id,
          aula_id,
          docente_id,
          n_codper_equ,
          c_codmod_equ,
          c_codfac_equ,
          c_codesp_equ,
          c_codcur_equ,
          c_nomcur_equ,
        },
      });
      resultados.push({ tipo: 'creado', horario: creado });
    }

    return {
      mensaje: '✔️ Horarios procesados correctamente',
      resultados,
    };
  }

  async getHorario(turno_id: number) {
    const horarios = await this.prismaService.horario.findMany({
      where: { turno_id: turno_id },
    });
    if (!horarios) {
      throw new NotFoundException('Este turno_id no existe');
    }
    return horarios;
  }

  async getHorarios(
    c_codmod?: string,
    n_codper?: number,
    c_codfac?: string,
    c_codesp?: string,
    n_codpla?: number,
  ) {
    const horarios = await this.prismaService.horario.findMany({
      where: {
        turno: {
          ...(c_codmod && { c_codmod }),
          ...(n_codper && { n_codper }),
          ...(c_codfac && { c_codfac }),
          ...(c_codesp && { c_codesp }),
          ...(n_codpla && { n_codpla }),
        },
      },
      include: { turno: true, hijos: true, Docente: true },
    });
    return horarios;
  }

  async deleteHorario(id: number) {
    const horarioExistente = await this.prismaService.horario.findUnique({
      where: { id },
    });

    if (!horarioExistente) {
      throw new NotFoundException('⚠️ Este horario no existe');
    }

    await this.prismaService.horario.delete({
      where: { id },
    });

    return {
      mensaje: '✅ Horario eliminado correctamente',
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

  async asociarHorarioTransversal(
    asignarCursoTransversalDto: AsignarCursoTransversalDto,
  ) {
    const { padre_id, hijo_id } = asignarCursoTransversalDto;

    const padre = await this.prismaService.horario.findUnique({
      where: { id: padre_id },
    });

    const hijo = await this.prismaService.horario.findUnique({
      where: { id: hijo_id },
    });

    if (!padre || !hijo) {
      throw new NotFoundException('Horario padre o hijo no encontrado');
    }

    const actualizado = await this.prismaService.horario.update({
      where: { id: hijo_id },
      data: {
        horario_padre_id: padre_id,
        h_inicio: padre.h_inicio,
        h_fin: padre.h_fin,
        aula_id: padre.aula_id,
        docente_id: padre.docente_id,
      },
    });

    return {
      mensaje: '✅ Horario asociado como transversal correctamente',
      hijo: actualizado,
    };
  }
}
