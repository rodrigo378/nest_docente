import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCursoPlanDto } from './dto/updateCursoPlanDto';

@Injectable()
export class PlanService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCursoPlan() {
    return await this.prismaService.tb_plan_estudio_curso.findMany();
  }

  async updateCursoPlan(
    // user_id: number,
    planCurso_id: number,
    updateCursoPlanDto: UpdateCursoPlanDto,
  ) {
    const planCurso = await this.prismaService.tb_plan_estudio_curso.findUnique(
      { where: { id: planCurso_id } },
    );

    if (!planCurso) {
      throw new NotFoundException(`Curso con id ${planCurso} no encontrado`);
    }

    const updatePlanCurso =
      await this.prismaService.tb_plan_estudio_curso.update({
        where: { id: planCurso_id },
        data: {
          ...updateCursoPlanDto,
        },
      });

    return {
      message: 'Docente actualizado correctamente',
      curso: updatePlanCurso,
    };
  }
}
