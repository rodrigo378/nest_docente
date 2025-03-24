import { Injectable } from '@nestjs/common';
import { PrismaReadonlyService } from 'src/prisma/readonly.service';
import { GetCursoDto } from './dto/getCursoDto';

@Injectable()
export class SiguService {
  constructor(private readonly prismaReadonly: PrismaReadonlyService) {}

  async getEspecialidades() {
    return await this.prismaReadonly.$queryRawUnsafe(
      `SELECT codfac, codesp, nomesp, estado, c_abrevesp 
        FROM tb_especialidad 
        WHERE codfac IN ('S', 'E')`,
    );
  }

  async getCarreras(n_ciclo: number, c_codfac: string) {
    return await this.prismaReadonly.$queryRawUnsafe(
      `select 
          tp.c_codmod,
          tp.c_codfac,
          tp.c_codesp,
            tb.nomesp,
            tp.c_ciclo,
            tp.n_ciclo
        from tb_plan_estudio_curso tp
        inner join tb_especialidad tb on (tp.c_codfac  = tb.codfac and tp.c_codesp  = tb.codesp)
        where n_ciclo = ? and c_codfac = ?
        group by tp.c_codfac, tp.c_codesp, tp.c_ciclo, tp.n_ciclo  , tp.c_codmod
        -- order by tp.c_ciclo;
        order by tb.nomesp, tp.n_ciclo -- , tp.c_codmod;
        `,
      n_ciclo,
      c_codfac,
    );
  }

  async getCicloCarreras(c_codfac: string) {
    return await this.prismaReadonly.$queryRawUnsafe(
      `SELECT 
            es.nomesp AS especialidad,
            GROUP_CONCAT(DISTINCT pe.c_ciclo ORDER BY pe.c_ciclo SEPARATOR ', ') AS ciclos
        FROM tb_plan_estudio_curso pe
        JOIN tb_especialidad es 
            ON pe.c_codesp = es.codesp  
            AND pe.c_codfac = es.codfac
        WHERE pe.c_codfac = ?
        GROUP BY es.nomesp;`,
      c_codfac,
    );
  }

  async getCursos(getCursoDto: GetCursoDto) {
    return await this.prismaReadonly.$queryRawUnsafe(
      `select
          tp.n_codper,
          tp.c_codmod,
          tb.c_nommod,
          tp.c_codfac,
          tp.c_codesp,
          tp.n_ciclo,
          tp.c_ciclo,
          tp.c_codcur,
          tp.c_nomcur,
          tp.n_ht,
          tp.n_hp
        FROM tb_plan_estudio_curso tp
        inner join tb_modalidad tb on tb.c_codmod = tp.c_codmod
        where tp.n_codper in (2023, 2025)
        and tp.c_codfac = ?
        and tp.c_codesp = ?
        and tp.n_ciclo = ?
        group by
          tp.n_codper,
          tp.c_codmod,
          tp.c_codfac,
          tp.c_codesp,
          tp.c_codcur,
          tp.c_nomcur,
          tp.n_ciclo,
          tp.c_ciclo,
          tp.n_ht,
          tp.n_hp
        order by tp.c_nomcur;
        `,
      getCursoDto.c_codfac,
      getCursoDto.c_codesp,
      getCursoDto.n_ciclo,
    );
  }

  async getEquivalencias() {
    return await this.prismaReadonly.$queryRawUnsafe(`
      SELECT * FROM tb_plan_estudio_equ WHERE n_codper in (2023, 2025)
    `);
  }
}
