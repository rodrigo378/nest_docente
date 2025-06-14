import { seedAula } from './seed/aula';
import { seedItems } from './seed/item';
import { seedTurno } from './seed/turno';
// import { seedCurso } from './seed/cursos';
import { seedUsers } from './seed/usuario';
import { seedModulos } from './seed/modulo';
import { seedPeriodo } from './seed/periodo';
import { PrismaClient } from '@prisma/client';
import { seedDistrito } from './seed/distrito.seed';
import { seedPermissions } from './seed/permission';
import { seedProvincia } from './seed/provincia.seed';
import { seedDepartamentos } from './seed/departamento.seed';

const prisma = new PrismaClient();
async function main() {
  await seedAula();
  await seedPeriodo();
  await seedTurno();
  // await seedCurso();
  await seedUsers();
  await seedModulos();
  await seedItems();
  await seedPermissions();

  await seedDepartamentos();
  await seedProvincia();
  await seedDistrito();
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
