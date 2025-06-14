import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaReadonlyService } from 'src/prisma/readonly.service';

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

  // async getCursos(getCursoDto: GetCursoDto) {
  //   const turno = await this.prismaService.turno.findFirst({
  //     where: {
  //       n_codper: getCursoDto.n_codper,
  //       n_codpla: getCursoDto.n_codpla,
  //       c_codfac: getCursoDto.c_codfac,
  //       c_codesp: getCursoDto.c_codesp,
  //       n_ciclo: Number(getCursoDto.n_ciclo),
  //       c_codmod: Number(getCursoDto.c_codmod),
  //       c_grpcur: getCursoDto.c_grpcur,
  //     },
  //   });

  //   if (!turno) {
  //     return [];
  //   }

  //   const cursosSigu = await this.prismaReadonly.$queryRawUnsafe<CursoQuery[]>(
  //     `SELECT
  //         tp.n_codper,
  //         tp.c_codmod,
  //         tb.c_nommod,
  //         tp.c_codfac,
  //         t_f.nom_fac,
  //         tp.c_codesp,
  //         t_e.nomesp,
  //         tp.c_area,
  //         tpec.c_nom_cur_area,
  //         tp.n_ciclo,
  //         tp.c_codcur,
  //         tp.c_nomcur,
  //         tp.n_ht,
  //         tp.n_hp,
  //         tpee.n_codper_equ,
  //         tpee.c_codmod_equ,
  //         tpee.c_codfac_equ,
  //         tpee.c_codesp_equ,
  //         tpee.c_codcur_equ,
  //         tpee.c_nomcur_equ,
  //         tp.c_curup as h_umaPlus
  //       FROM
  //         tb_plan_estudio_curso tp
  //         INNER JOIN tb_modalidad tb ON tb.c_codmod = tp.c_codmod
  //         left JOIN tb_plan_estudio_curso_area tpec ON tpec.c_cod_cur_area = tp.c_area
  //         INNER JOIN tb_facultad t_f ON t_f.cod_fac = tp.c_codfac
  //         INNER JOIN tb_especialidad t_e ON t_e.codesp = tp.c_codesp
  //         LEFT JOIN (
  //             SELECT DISTINCT
  //               te.c_codcur,
  //               te.c_codfac,
  //               te.c_codesp,
  //               te.c_codmod,
  //               te.n_codper_equ,
  //               te.c_codmod_equ,
  //               te.c_codfac_equ,
  //               te.c_codesp_equ,
  //               te.c_codcur_equ,
  //               tp2.c_nomcur AS c_nomcur_equ
  //             FROM tb_plan_estudio_equ te
  //             INNER JOIN tb_plan_estudio_curso tp2 ON te.c_codcur_equ = tp2.c_codcur
  //             WHERE te.n_codper_equ IN (2023, 2025)
  //         ) tpee
  //           ON tpee.c_codcur = tp.c_codcur
  //           AND tpee.c_codmod = tp.c_codmod
  //           AND tpee.c_codfac = tp.c_codfac
  //           AND tpee.c_codesp = tp.c_codesp
  //       WHERE
  //         tp.n_codper IN (2023, 2025)
  //         AND tp.c_codfac = ?
  //         AND tp.c_codesp = ?
  //         AND tp.n_ciclo = ?
  //         AND tp.c_codmod = ?
  //       GROUP BY
  //         tp.n_codper, tp.c_codmod, tb.c_nommod, tp.c_codfac, t_f.nom_fac,
  //         tp.c_codesp, t_e.nomesp, tp.c_area, tpec.c_nom_cur_area,
  //         tp.c_codcur, tp.c_nomcur, tp.n_ciclo,
  //         tp.n_ht, tp.n_hp,
  //         tpee.n_codper_equ, tpee.c_codmod_equ, tpee.c_codfac_equ,
  //         tpee.c_codesp_equ, tpee.c_codcur_equ, tpee.c_nomcur_equ,
  //         tp.c_curup
  //       ORDER BY tp.c_nomcur;`,
  //     getCursoDto.c_codfac,
  //     getCursoDto.c_codesp,
  //     getCursoDto.n_ciclo,
  //     getCursoDto.c_codmod,
  //   );

  //   const cursosLocales = await this.prismaService.curso.findMany({
  //     where: {
  //       turno_id: turno.id,
  //     },
  //     include: {
  //       cursosPadres: true,
  //     },
  //   });

  //   const cursosFinal = await Promise.all(
  //     cursosSigu.map(async (curso) => {
  //       const match = cursosLocales.find(
  //         (c) =>
  //           String(c.n_codper) === String(curso.n_codper) &&
  //           Number(c.c_codmod) === Number(curso.c_codmod) &&
  //           c.c_codfac === curso.c_codfac &&
  //           c.c_codesp === curso.c_codesp &&
  //           c.c_codcur === curso.c_codcur,
  //       );

  //       let tipoAgrupado: number | null = null;
  //       let c_alu_total = match?.c_alu ?? null;

  //       if (match?.cursosPadres?.[0]?.padre_curso_id) {
  //         tipoAgrupado = match.cursosPadres[0].tipo;

  //         try {
  //           const cursosDelGrupo =
  //             await this.prismaService.grupo_sincro.findMany({
  //               where: {
  //                 padre_curso_id: match.cursosPadres[0].padre_curso_id,
  //               },
  //             });

  //           let sumaCAlu = 0;
  //           for (const curso of cursosDelGrupo) {
  //             const cursoDB = await this.prismaService.curso.findFirst({
  //               where: { id: curso.curso_id },
  //               select: { c_alu: true },
  //             });
  //             if (cursoDB?.c_alu) sumaCAlu += cursoDB.c_alu;
  //           }

  //           // console.log(
  //           // `🔢 Total c_alu del grupo [${match.cursosPadres[0].padre_curso_id}]:`,
  //           // sumaCAlu,
  //           // );
  //           c_alu_total = sumaCAlu;
  //         } catch (err) {
  //           console.error('❌ Error al obtener cursos del grupo:', err);
  //         }
  //       }

  //       return {
  //         ...curso,
  //         tipoAgrupado,
  //         c_alu: c_alu_total,
  //       };
  //     }),
  //   );

  //   return cursosFinal;
  // }
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

// SELECT distinct
//     tp.n_codper,
//     tp.c_codmod,
//     tb.c_nommod,
//     tp.c_codfac,
//     tp.c_codesp,
//     tp.n_ciclo,
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

// REGISTRA EXAMENES Y PRACTICAS = EP
// DOCENTE OFICIAL = DO
// DOCENTE TEORIA = E
// DOCENTE PRACTICA = P
// NO REGISTRA EVALUACIONES = NR

/* 
  Exportar al sigu

  1 => Se crean los cursos
  select * from tb_curso_grupo where n_codper = 20251;
  {
    n_codper: 20251,
    c_codfac: E,
    c_codcur: ANI01001,
    c_grpcur: N1,
    c_codmod: 2,
    d_freg: 2024-11-29 11:51:59, => fecha de creacion
    c_codesp: E4,
    n_codpla: 2023,
    c_sedcod: 1, => no cambia
    id_unidad_estudio_plan:  12 => varia nose 
    n_sync_plan: 1, => no cambia
    n_tipprog: 1, => no cambia
    lock: 0 => no cambia
    moodle: 0 => no cambia
  }

  // 2 => se le asigna docente
  select * from tb_doc_cur_grp where n_codper = 20251;
  {
    c_dnidoc:  0289293,
    n_codper: 20251,
    c_codmod: 1,
    c_codfac: S,
    c_codcur: PESG5024,
    c_grpcur: T1,
    c_tipo: EP, => nose cambia
    c_categoria: P => no cambia nose,
    c_codesp: S2
    n_codpla: 2025,
    c_sedcod: 1 => no cambia
  }

  // 3 => se le asigna horario docente
  select * from tb_cur_grp_hor where n_codper = 20251;
  {
    id: 17838,
    n_codper: 20251,
    c_codfac: S,
    c_codcur: PSI0703,
    c_grpcur: N1,
    c_dnidoc: 23937540,
    n_numdia: 1,
    c_hh_ini: 19,
    c_min_ini: 40,
    c_hh_fin: 19,
    c_min_fin: 40,
    n_break: 0 => no cambia
    d_freg: 2024-11-28 11:01:47,
    c_codmod: 2,
    c_tipo: TEV
    id_aula: 0 => cambia,
    c_codesp: S4,
    n_codpla: 2025,
    c_sedcod: 1 => no cambia
  }

  // 4 negativo => 5 positivo
  select * from tb_curso_grupo_sincro ORDER BY courseid DESC
  {
    courseid: -1 => negativo
    c_codfac: S
    c_codesp: S1
    c_sedcod: 1
    c_codcur: SESG3031
    c_grpcur: CS1
    n_codper: 20251
    c_codmod: 2
    n_codpla: 2025
    tipo: 1
    f_reg: 2025-05-08 14:51:41
    f_upd: 2025-05-08 14:51:41
    orden: 1
    shortname: SESG3031-1-251-CS1 => null
    name: INGLÉS I (ENF CS1) => null
  }

  // 5 asignar numero de vacantes
  select * from tb_cur_grp_vac;
  {
    n_codper: 20201
    c_codfac: E
    c_codcur: EEGG107
    c_grpcur: N1
    n_vactot: 10 => vacatentes totales igual
    n_vacmax: 10 => vacantes maxima igual
    n_vacmat: 10 => vacantes matriculadas
    c_codadm: null => no cambia  
    d_freg: null => no cambia 
    d_fact: null => no cambia 
    c_codmod: 2
    c_codesp: E3
    n_codpla: 2025
    c_sedcod: 1 => no cambia
  }
*/

/*
CREATE TABLE `tb_plan_estudio_curso` (
  `id` int primary key auto_increment,
  `n_codper` int DEFAULT NULL,
  `c_codmod` int DEFAULT NULL,
  `c_codfac` varchar(255) DEFAULT NULL,
  `c_codesp` varchar(255) DEFAULT NULL,
  `c_codcur` varchar(255) DEFAULT NULL,
  `c_nomcur` varchar(255) DEFAULT NULL,
  `n_ciclo` int DEFAULT NULL,
  `n_ht` int DEFAULT NULL,
  `n_hp` int DEFAULT NULL,
  `c_area` varchar(255) DEFAULT NULL,
  `c_curup` varchar(255) DEFAULT NULL
) 
*/
