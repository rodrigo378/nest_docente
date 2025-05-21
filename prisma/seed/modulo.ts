import { PrismaClient, Modulo } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedModulos() {
  console.log('🌱 Seeding Modulos...');

  const data: Omit<Modulo, 'id'>[] = [
    {
      nombre: 'Gestión Usuario',
      codigo: '1',
      icono: null,
      estado: 'A',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nombre: 'Asignar Horarios COA',
      codigo: '2',
      icono: null,
      estado: 'A',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nombre: 'Asignar Horarios Director',
      codigo: '3',
      icono: null,
      estado: 'A',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nombre: 'Docente',
      codigo: '4',
      icono: null,
      estado: 'A',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const result = await prisma.modulo.createMany({ data });

  console.log('✅ Modulos insertados:', result);
}
