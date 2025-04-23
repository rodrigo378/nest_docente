import { PrismaClient, Periodo } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedPeriodo() {
  console.log('🌱 Seeding Periodos...');

  const data: Periodo[] = [
    {
      n_codper: 20241,
      f_cierre: new Date('2025-06-01'),
    },
    {
      n_codper: 20242,
      f_cierre: new Date('2025-01-01'),
    },
    {
      n_codper: 20251,
      f_cierre: new Date('2025-01-01'),
    },
  ];

  const result = await prisma.periodo.createMany({ data });

  console.log('✅ Periodos insertados:', result);
}
