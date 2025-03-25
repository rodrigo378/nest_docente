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
      `SELECT distinct
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
        tp.n_hp,
        te.n_codper_equ,
        te.c_codmod_equ,
        te.c_codfac_equ,
        te.c_codesp_equ,
        te.c_codcur_equ,
        te.c_nomcur_equ
      FROM
        tb_plan_estudio_curso tp
          INNER JOIN
        tb_modalidad tb ON tb.c_codmod = tp.c_codmod
          INNER JOIN
      (select distinct 
        te.*,
        tp.c_nomcur as c_nomcur_equ
      from tb_plan_estudio_equ te
      inner join tb_plan_estudio_curso tp on te.c_codcur_equ = tp.c_codcur) te ON te.c_codcur_equ = tp.c_codcur
      WHERE 
        tp.n_codper IN (2023 , 2025)
        AND tp.c_codfac = ?
        AND tp.c_codesp = ?
        AND tp.n_ciclo = ?
        AND tp.c_codmod = ?
      GROUP BY tp.n_codper , tp.c_codmod , tp.c_codfac , tp.c_codesp , tp.c_codcur , tp.c_nomcur , tp.n_ciclo , tp.c_ciclo , tp.n_ht , tp.n_hp, te.n_codper_equ,
        te.c_codmod_equ,
        te.c_codfac_equ,
        te.c_codesp_equ,
        te.c_codcur_equ,
        te.c_nomcur_equ
      ORDER BY tp.c_nomcur;
        `,
      getCursoDto.c_codfac,
      getCursoDto.c_codesp,
      getCursoDto.n_ciclo,
      getCursoDto.c_codmod,
    );
  }

  async getEquivalencias() {
    return await this.prismaReadonly.$queryRawUnsafe(`
      SELECT * FROM tb_plan_estudio_equ WHERE n_codper in (2023, 2025)
    `);
  }
}

// SELECT distinct
//     tp.n_codper,
//     tp.c_codmod,
//     tb.c_nommod,
//     tp.c_codfac,
//     tp.c_codesp,
//     tp.n_ciclo,
//     tp.c_ciclo,
//     tp.c_codcur,
//     tp.c_nomcur,
//     tp.n_ht,
//     tp.n_hp,
//     te.n_codper_equ,
//     te.c_codmod_equ,
//     te.c_codfac_equ,
//     te.c_codesp_equ,
//     te.c_codcur_equ,
//     te.c_nomcur_equ
// FROM
//     tb_plan_estudio_curso tp
//         INNER JOIN
//     tb_modalidad tb ON tb.c_codmod = tp.c_codmod
//             INNER JOIN
//     (select distinct
// 		te.*,
// 		tp.c_nomcur as c_nomcur_equ
// 	from tb_plan_estudio_equ te
// 	inner join tb_plan_estudio_curso tp on te.c_codcur_equ = tp.c_codcur) te ON te.c_codcur_equ = tp.c_codcur
// WHERE
//     tp.n_codper IN (2023 , 2025)
//         AND tp.c_codfac = 'S'
//         AND tp.c_codesp = 'S1'
//         AND tp.n_ciclo = 1
//         AND tp.c_codmod = 1
// GROUP BY tp.n_codper , tp.c_codmod , tp.c_codfac , tp.c_codesp , tp.c_codcur , tp.c_nomcur , tp.n_ciclo , tp.c_ciclo , tp.n_ht , tp.n_hp, te.n_codper_equ,
//     te.c_codmod_equ,
//     te.c_codfac_equ,
//     te.c_codesp_equ,
//     te.c_codcur_equ,
//     te.c_nomcur_equ
// ORDER BY tp.c_nomcur;

// select * from tb_plan_estudio_curso where c_codcur = "ANI 102";
// select distinct
// 	te.*,
//     tp.c_nomcur as c_nomcur_equ
// from tb_plan_estudio_equ te
// inner join tb_plan_estudio_curso tp on te.c_codcur_equ = tp.c_codcur;
