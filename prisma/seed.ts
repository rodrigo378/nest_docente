import { PrismaClient } from '@prisma/client';
import { seedDepartamentos } from './seed/departamento.seed';
import { seedProvincia } from './seed/provincia.seed';
import { seedDistrito } from './seed/distrito.seed';
import { seedTurno } from './seed/turno';
import { seedCurso } from './seed/cursos';
import { seedAula } from './seed/aula';
import { seedPeriodo } from './seed/periodo';

const prisma = new PrismaClient();
async function main() {
  await seedDepartamentos();
  await seedProvincia();
  await seedDistrito();
  await seedAula();
  await seedPeriodo();
  await seedTurno();
  await seedCurso();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
