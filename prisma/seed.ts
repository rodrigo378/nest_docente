import { PrismaClient } from '@prisma/client';
import { seedDepartamentos } from './seed/departamento.seed';
import { seedProvincia } from './seed/provincia.seed';
import { seedDistrito } from './seed/distrito.seed';
const prisma = new PrismaClient();
async function main() {
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
