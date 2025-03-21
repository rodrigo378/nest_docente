import { Injectable } from '@nestjs/common';
import { PrismaReadonlyService } from 'src/prisma/readonly.service';
import { GetCursoDto } from './dto/getCursoDto';

@Injectable()
export class CursoService {
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

  //asdasd
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
        n_codper,
        c_codmod,
        c_codfac,
        c_codesp,
        n_ciclo,
        c_ciclo,
        c_codcur,
        c_nomcur,
        n_ht,
        n_hp
      FROM tb_plan_estudio_curso
      where n_codper in (2023, 2025)
      and c_codfac = ?
      and c_codesp = ?
      and n_ciclo = ?
      group by
        n_codper,
        c_codmod,
        c_codfac,
        c_codesp,
        c_codcur,
        c_nomcur,
        n_ciclo,
        c_ciclo,
        n_ht,
        n_hp
      order by c_nomcur;
      `,
      getCursoDto.c_codfac,
      getCursoDto.c_codesp,
      getCursoDto.n_ciclo,
    );
  }

  // async getCursos(c_codfac: string, c_ciclo: string) {
  //   return await this.prismaReadonly.$queryRawUnsafe(
  //     `SELECT
  //         c_nomcur,
  //         n_ht,
  //         n_hp,
  //         c_codmod,
  //         CASE
  //             WHEN c_codmod = 1 THEN 'Presencial'
  //             WHEN c_codmod = 2 THEN 'Semipresencial'
  //             WHEN c_codmod = 3 THEN 'Virtual'
  //             ELSE 'Desconocido'
  //         END AS modalidad
  //     FROM tb_plan_estudio_curso
  //     WHERE c_codfac = ?
  //       AND c_ciclo = ?
  //       AND n_codper = 2025
  //     GROUP BY c_nomcur, c_codmod, n_ht, n_hp;`,
  //     c_codfac,
  //     c_ciclo,
  //   );
  // }
}
