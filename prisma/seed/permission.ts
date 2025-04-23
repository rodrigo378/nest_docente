import { PrismaClient, Permission } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedPermissions() {
  console.log('🌱 Seeding Modulos...');

  const data: Omit<Permission, 'id'>[] = [
    {
      userId: 1,
      itemId: 1,
      estado: 'A',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 1,
      itemId: 2,
      estado: 'A',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const result = await prisma.permission.createMany({ data });

  console.log('✅ Permisos insertados:', result);
}
