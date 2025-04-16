import { Injectable } from '@nestjs/common';
import { PrismaReadonlyService } from 'src/prisma/readonly.service';
import { GetCursoDto } from './dto/getCursoDto';
import { PrismaService } from 'src/prisma/prisma.service';

interface CursoQuery {
  n_codper: number;
  c_codmod: string;
  c_nommod: string;
  c_codfac: string;
  c_codesp: string;
  n_ciclo: number;
  c_ciclo: string;
  c_codcur: string;
  c_nomcur: string;
  n_ht: number;
  n_hp: number;
  equivalencias: string | null;
}

@Injectable()
export class SiguService {
  constructor(
    private readonly prismaReadonly: PrismaReadonlyService,
    private readonly prismaService: PrismaService,
  ) {}

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
    const turno = await this.prismaService.turno.findFirst({
      where: {
        c_codfac: getCursoDto.c_codfac,
        c_codesp: getCursoDto.c_codesp,
        n_ciclo: Number(getCursoDto.n_ciclo),
        c_codmod: Number(getCursoDto.c_codmod),
        c_grpcur: getCursoDto.c_grpcur,
      },
    });

    if (!turno) {
      return [];
    }

    const cursosSigu = await this.prismaReadonly.$queryRawUnsafe<CursoQuery[]>(
      `SELECT
          tp.n_codper,
          tp.c_codmod,
          tb.c_nommod,
          tp.c_codfac,
          t_f.nom_fac,
          tp.c_codesp,
          t_e.nomesp,
          tp.c_area,
          tpec.c_nom_cur_area,
          tp.n_ciclo,	
          tp.c_ciclo,
          tp.c_codcur,
          tp.c_nomcur,
          tp.n_ht,
          tp.n_hp,
          tpee.n_codper_equ,
          tpee.c_codmod_equ,
          tpee.c_codfac_equ,
          tpee.c_codesp_equ,
          tpee.c_codcur_equ,
          tpee.c_nomcur_equ,
          tp.c_curup as h_umaPlus
        FROM
          tb_plan_estudio_curso tp
          INNER JOIN tb_modalidad tb ON tb.c_codmod = tp.c_codmod 
          INNER JOIN tb_plan_estudio_curso_area tpec ON tpec.c_cod_cur_area = tp.c_area
          INNER JOIN tb_facultad t_f ON t_f.cod_fac = tp.c_codfac
          INNER JOIN tb_especialidad t_e ON t_e.codesp = tp.c_codesp
          LEFT JOIN (
              SELECT DISTINCT
                te.c_codcur,
                te.c_codfac,
                te.c_codesp,
                te.c_codmod,
                te.n_codper_equ,
                te.c_codmod_equ,
                te.c_codfac_equ,
                te.c_codesp_equ,
                te.c_codcur_equ,
                tp2.c_nomcur AS c_nomcur_equ
              FROM tb_plan_estudio_equ te
              INNER JOIN tb_plan_estudio_curso tp2 ON te.c_codcur_equ = tp2.c_codcur
              WHERE te.n_codper_equ IN (2023, 2025)
          ) tpee 
            ON tpee.c_codcur = tp.c_codcur 
           AND tpee.c_codmod = tp.c_codmod 
           AND tpee.c_codfac = tp.c_codfac
           AND tpee.c_codesp = tp.c_codesp
        WHERE
          tp.n_codper IN (2023, 2025) 
          AND tp.c_codfac = ?
          AND tp.c_codesp = ?
          AND tp.n_ciclo = ?
          AND tp.c_codmod = ?
        GROUP BY
          tp.n_codper, tp.c_codmod, tb.c_nommod, tp.c_codfac, t_f.nom_fac,
          tp.c_codesp, t_e.nomesp, tp.c_area, tpec.c_nom_cur_area,
          tp.c_codcur, tp.c_nomcur, tp.n_ciclo, tp.c_ciclo,
          tp.n_ht, tp.n_hp,
          tpee.n_codper_equ, tpee.c_codmod_equ, tpee.c_codfac_equ,
          tpee.c_codesp_equ, tpee.c_codcur_equ, tpee.c_nomcur_equ,
          tp.c_curup
        ORDER BY tp.c_nomcur;`,
      getCursoDto.c_codfac,
      getCursoDto.c_codesp,
      getCursoDto.n_ciclo,
      getCursoDto.c_codmod,
    );

    const cursosLocales = await this.prismaService.curso.findMany({
      where: {
        turno_id: turno.id,
      },
      include: {
        cursosPadres: true,
      },
    });

    const cursosFinal = cursosSigu.map((curso) => {
      const match = cursosLocales.find(
        (c) =>
          String(c.n_codper) === String(curso.n_codper) &&
          Number(c.c_codmod) === Number(curso.c_codmod) &&
          c.c_codfac === curso.c_codfac &&
          c.c_codesp === curso.c_codesp &&
          c.c_codcur === curso.c_codcur,
      );

      const tipoAgrupado = match?.cursosPadres?.length
        ? match.cursosPadres[0].tipo
        : null;

      return {
        ...curso,
        tipoAgrupado,
        vacante: Math.floor(Math.random() * (30 - 10 + 1)) + 10,
      };
    });

    return cursosFinal;
  }

  // async getCursos(getCursoDto: GetCursoDto) {
  //   return await this.prismaReadonly.$queryRawUnsafe(
  //     `SELECT
  //       tp.n_codper,
  //       tp.c_codmod,
  //       tb.c_nommod,
  //       tp.c_codfac,
  //       tp.c_codesp,
  //       tp.c_area,
  //       tpec.c_nom_cur_area,
  //       tp.n_ciclo,
  //       tp.c_ciclo,
  //       tp.c_codcur,
  //       tp.c_nomcur,
  //       tp.n_ht,
  //       tp.n_hp
  //     FROM
  //       tb_plan_estudio_curso tp
  //       INNER JOIN tb_modalidad tb ON tb.c_codmod = tp.c_codmod
  //       INNER JOIN tb_plan_estudio_curso_area tpec ON tpec.c_cod_cur_area = tp.c_area
  //     WHERE
  //       tp.n_codper IN ( 2023, 2025 )
  //       AND tp.c_codfac = ?
  //       AND tp.c_codesp = ?
  //       AND tp.n_ciclo = ?
  //       AND tp.c_codmod = ?
  //     GROUP BY
  //       tp.n_codper,
  //       tp.c_codmod,
  //       tp.c_codfac,
  //       tp.c_codesp,
  //       tp.c_area,
  //       tpec.c_nom_cur_area,
  //       tp.c_codcur,
  //       tp.c_nomcur,
  //       tp.n_ciclo,
  //       tp.c_ciclo,
  //       tp.n_ht,
  //       tp.n_hp
  //     ORDER BY
  //       tp.c_nomcur;
  //       `,
  // getCursoDto.c_codfac,
  // getCursoDto.c_codesp,
  // getCursoDto.n_ciclo,
  // getCursoDto.c_codmod,
  //   );
  // }
  // async getCursos(getCursoDto: GetCursoDto) {
  //   return await this.prismaReadonly.$queryRawUnsafe(
  //     `SELECT distinct
  //       tp.n_codper,
  //       tp.c_codmod,
  //       tb.c_nommod,
  //       tp.c_codfac,
  //       tp.c_codesp,
  //       tp.n_ciclo,
  //       tp.c_ciclo,
  //       tp.c_codcur,
  //       tp.c_nomcur,
  //       tp.n_ht,
  //       tp.n_hp,
  //       te.n_codper_equ,
  //       te.c_codmod_equ,
  //       te.c_codfac_equ,
  //       te.c_codesp_equ,
  //       te.c_codcur_equ,
  //       te.c_nomcur_equ
  //     FROM
  //       tb_plan_estudio_curso tp
  //         INNER JOIN
  //       tb_modalidad tb ON tb.c_codmod = tp.c_codmod
  //         INNER JOIN
  //     (select distinct
  //       te.*,
  //       tp.c_nomcur as c_nomcur_equ
  //     from tb_plan_estudio_equ te
  //     inner join tb_plan_estudio_curso tp on te.c_codcur_equ = tp.c_codcur) te ON te.c_codcur_equ = tp.c_codcur
  //     WHERE
  //       tp.n_codper IN (2023 , 2025)
  //       AND tp.c_codfac = ?
  //       AND tp.c_codesp = ?
  //       AND tp.n_ciclo = ?
  //       AND tp.c_codmod = ?
  //     GROUP BY tp.n_codper , tp.c_codmod , tp.c_codfac , tp.c_codesp , tp.c_codcur , tp.c_nomcur , tp.n_ciclo , tp.c_ciclo , tp.n_ht , tp.n_hp, te.n_codper_equ,
  //       te.c_codmod_equ,
  //       te.c_codfac_equ,
  //       te.c_codesp_equ,
  //       te.c_codcur_equ,
  //       te.c_nomcur_equ
  //     ORDER BY tp.c_nomcur;
  //       `,
  //     getCursoDto.c_codfac,
  //     getCursoDto.c_codesp,
  //     getCursoDto.n_ciclo,
  //     getCursoDto.c_codmod,
  //   );
  // }

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
