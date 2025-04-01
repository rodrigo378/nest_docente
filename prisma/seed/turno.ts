import { PrismaClient, Turno } from '@prisma/client';
import { PrismaClient as PrismaClient2 } from '../../prisma/generated/readonly';

// const prisma = new PrismaClient();
const prismaReadonly = new PrismaClient2();
const prisma = new PrismaClient();

export async function seedTurno() {
  console.log('🌱 Seeding Turno...');

  const turnosBD: Turno[] = await prismaReadonly.$queryRawUnsafe(`
    SELECT
      a.n_codper,
      a.n_codpla,
      b.c_codfac,
      c.nom_fac,
      b.c_codesp,
      d.nomesp,
      a.c_grpcur,
      a.c_codmod,
      e.c_nommod,
      b.n_ciclo
    FROM tb_curso_grupo a
    INNER JOIN tb_plan_estudio_curso b
      ON a.c_codcur = b.c_codcur
      AND a.c_codmod = b.c_codmod
      AND a.c_codfac = b.c_codfac
      AND a.c_codesp = b.c_codesp
      AND a.n_codpla = b.n_codper
    INNER JOIN tb_facultad c
      ON a.c_codfac = c.cod_fac
    INNER JOIN tb_especialidad d
      ON a.c_codesp = d.codesp
      AND a.c_codfac = d.codfac
    INNER JOIN tb_modalidad e
      ON a.c_codmod = e.c_codmod
    WHERE a.n_codper = 20251 -- and n_ciclo = 1
    AND a.c_codfac IN ('E', 'S')
    GROUP BY
    a.n_codper,
    a.n_codpla,
    b.c_codfac,
    c.nom_fac,
    b.c_codesp,
    d.nomesp,
    a.c_grpcur,
    a.c_codmod,
    e.c_nommod,
    b.n_ciclo;
  `);

  const result = await prisma.turno.createMany({
    data: turnosBD,
    skipDuplicates: true,
  });

  console.log('✅ Departamentos insertados:', result);

  // for (const turnoBD of turnosBD) {
  //   await prisma.turno.create({ data: turnoBD });
  // }
}
