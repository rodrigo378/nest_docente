import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePeriodoDto } from './dto/createPeriodoDto';
import { createLog } from 'src/common/utils/log.util';
import { UpdatePeriodoDto } from './dto/updatePeriodoDto';

@Injectable()
export class PeriodoService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPeriodo() {
    return await this.prismaService.periodo.findMany();
  }

  //se agrego log
  async createPeriodo(user_id: number, createPeriodoDto: CreatePeriodoDto) {
    const { n_codper, f_cierre } = createPeriodoDto;
    const newPeriodo = await this.prismaService.periodo.create({
      data: {
        n_codper,
        f_cierre,
      },
    });

    await createLog(
      this.prismaService,
      user_id,
      'periodo',
      'create',
      'Se creo periodo',
      null,
      {},
      newPeriodo,
    );
  }

  // se agrego log
  async updatePeriodo(
    user_id: number,
    n_codper: number,
    updateDto: UpdatePeriodoDto,
  ) {
    // Buscar el periodo existente
    const oldPeriodo = await this.prismaService.periodo.findUnique({
      where: { n_codper },
    });

    if (!oldPeriodo) {
      throw new Error('Periodo no encontrado');
    }

    // Actualizar el periodo
    const updatedPeriodo = await this.prismaService.periodo.update({
      where: { n_codper },
      data: {
        f_cierre: updateDto.f_cierre,
      },
    });

    // Generar log
    await createLog(
      this.prismaService,
      user_id,
      'periodo',
      'UPDATE',
      `Se actualizó el periodo ${n_codper}`,
      null,
      oldPeriodo,
      updatedPeriodo,
    );

    return {
      mensaje: '✅ Periodo actualizado correctamente',
      periodo: updatedPeriodo,
    };
  }
}
