import { Injectable } from '@nestjs/common';
import { PrismaReadonlyService } from 'src/prisma/readonly.service';

@Injectable()
export class EspecialidadesService {
  constructor(private readonly prismaReadonly: PrismaReadonlyService) {}

  async obtenerEspecialidades() {
    return await this.prismaReadonly.$queryRaw`
      SELECT codfac, codesp, nomesp, estado, c_abrevesp 
      FROM tb_especialidad 
      WHERE codfac IN ('S', 'E')
    `;
  }

  async obtenerCarrerasYCiclos(c_codfac: string) {
    return await this.prismaReadonly.$queryRaw`
      SELECT 
        es.nomesp AS especialidad,
        GROUP_CONCAT(DISTINCT pe.c_ciclo ORDER BY pe.c_ciclo SEPARATOR ', ') AS ciclos
      FROM tb_plan_estudio_curso pe
      JOIN tb_especialidad es 
        ON pe.c_codesp = es.codesp  
        AND pe.c_codfac = es.codfac
      WHERE pe.c_codfac = ${c_codfac}  
      GROUP BY es.nomesp
    `;
  }

  async obtenerCursos(c_codfac: string, c_ciclo: string) {
    return await this.prismaReadonly.$queryRaw`
      SELECT 
        pe.c_nomcur
      FROM tb_plan_estudio_curso pe
      WHERE pe.c_codfac = ${c_codfac}
        AND pe.c_ciclo = ${c_ciclo}
      GROUP BY pe.c_nomcur
    `;
  }
}
