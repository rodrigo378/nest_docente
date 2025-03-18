import { Injectable } from '@nestjs/common';
import { PrismaReadonlyService } from 'src/prisma/readonly.service';

@Injectable()
export class EspecialidadesService {

constructor(
    private readonly prismaReadonly: PrismaReadonlyService
) {}

  async obtenerEspecialidades() {
    return await this.prismaReadonly.$queryRaw`
      SELECT codfac, codesp, nomesp, estado, c_abrevesp 
      FROM tb_especialidad 
      WHERE codfac IN ('S', 'E')
    `;
  }
}
