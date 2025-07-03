// import { Curso, PrismaClient } from '@prisma/client';
// import { PrismaClient as PrismaClient2 } from '../../prisma/generated/readonly';

// const prismaReadonly = new PrismaClient2();
// const prisma = new PrismaClient();

// export async function seedCurso() {
//   console.log('🌱 Seeding Curso...');

//   const turnos = await prisma.turno.findMany();
//   let total = 0;
//   for (const turno of turnos) {
//     const cursosRaw: Curso[] = await prismaReadonly.$queryRawUnsafe(
//       `
//       SELECT
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
//         tpee.c_nomcur_equ
//       FROM
//         tb_plan_estudio_curso tp
//       INNER JOIN tb_modalidad tb ON tb.c_codmod = tp.c_codmod
//       INNER JOIN tb_plan_estudio_curso_area tpec ON tpec.c_cod_cur_area = tp.c_area
//       INNER JOIN tb_facultad t_f ON t_f.cod_fac = tp.c_codfac
//       INNER JOIN tb_especialidad t_e ON t_e.codesp = tp.c_codesp
//       left JOIN (SELECT distinct
//           te.c_codcur,
//           te.c_codfac,
//           te.c_codesp,
//           te.c_codmod,
//           te.n_codper_equ,
//           te.c_codmod_equ,
//           te.c_codfac_equ,
//           te.c_codesp_equ,
//           te.c_codcur_equ,
//           tp2.c_nomcur AS c_nomcur_equ
//       FROM tb_plan_estudio_equ te
//       INNER JOIN tb_plan_estudio_curso tp2 ON te.c_codcur_equ = tp2.c_codcur
//       WHERE te.n_codper_equ in (2023, 2025)) tpee
//       ON tpee.c_codcur = tp.c_codcur
//       and tpee.c_codmod = tp.c_codmod
//       and tpee.c_codfac = tp.c_codfac
//       and tpee.c_codesp = tp.c_codesp
//       WHERE
//         tp.n_codper IN ( 2023, 2025 )
//         AND tp.c_codfac = ?
//         AND tp.c_codesp = ?
//         AND tp.n_ciclo = ?
//         AND tp.c_codmod = ?
//       GROUP BY
//         tp.n_codper,
//         tp.c_codmod,
//         tb.c_nommod,
//         tp.c_codfac,
//         t_f.nom_fac,
//         tp.c_codesp,
//         t_e.nomesp,
//         tp.c_area,
//         tpec.c_nom_cur_area,
//         tp.c_codcur,
//         tp.c_nomcur,
//         tp.n_ciclo,
//         tp.n_ht,
//         tp.n_hp,
//     tpee.n_codper_equ,
//         tpee.c_codmod_equ,
//         tpee.c_codfac_equ,
//         tpee.c_codesp_equ,
//         tpee.c_codcur_equ,
//         tpee.c_nomcur_equ
//       ORDER BY
//         tp.c_nomcur;
//       `,
//       turno.c_codfac,
//       turno.c_codesp,
//       turno.n_ciclo,
//       turno.c_codmod,
//     );

//     // Filtramos solo los campos válidos del modelo Curso
//     const cursos = cursosRaw.map((curso) => ({
//       n_codper: String(curso.n_codper),
//       c_codmod: Number(curso.c_codmod),
//       c_codfac: curso.c_codfac,
//       nom_fac: curso.nom_fac,
//       c_codesp: curso.c_codesp,
//       nomesp: curso.nomesp,
//       c_codcur: curso.c_codcur,
//       c_nomcur: curso.c_nomcur,
//       n_ciclo: curso.n_ciclo,
//       c_area: curso.c_area,

//       n_codper_equ: curso.n_codper_equ ? String(curso.n_codper_equ) : null,
//       c_codmod_equ: curso.c_codmod_equ ? Number(curso.c_codmod_equ) : null,
//       c_codfac_equ: curso.c_codfac_equ ?? null,
//       c_codesp_equ: curso.c_codesp_equ ?? null,
//       c_codcur_equ: curso.c_codcur_equ ?? null,
//       c_nomcur_equ: curso.c_nomcur_equ ?? null,

//       turno_id: turno.id,
//     }));

//     // Insertamos todos de una vez
//     if (cursos.length > 0) {
//       const result = await prisma.curso.createMany({
//         data: cursos,
//         skipDuplicates: true,
//       });
//       total += result.count;
//     }
//   }

//   console.log('✅ Cursos insertados correctamente', total);
// }
