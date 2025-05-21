import { Item, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedItems() {
  console.log('🌱 Seeding Items...');

  const data: Omit<Item, 'id'>[] = [
    {
      moduloId: 1,
      nombre: 'Lista de usuarios',
      codigo: '1.1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      moduloId: 1,
      nombre: 'Permisos de usuarios',
      codigo: '1.2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      moduloId: 2,
      nombre: 'Asignar Horarios',
      codigo: '2.1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      moduloId: 2,
      nombre: 'Reporte docente',
      codigo: '2.2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      moduloId: 2,
      nombre: 'Reporte Aula',
      codigo: '2.3',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      moduloId: 2,
      nombre: 'Definir cursos transversales',
      codigo: '2.4',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      moduloId: 2,
      nombre: 'Definir cursos agrupados',
      codigo: '2.5',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      moduloId: 2,
      nombre: 'Agregar Periodo',
      codigo: '2.6',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      moduloId: 3,
      nombre: 'Asignar Horarios',
      codigo: '3.1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      moduloId: 3,
      nombre: 'Reporte Aula',
      codigo: '3.2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      moduloId: 4,
      nombre: 'Marcar Asistencia',
      codigo: '4.1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      moduloId: 4,
      nombre: 'Ver Asistencia',
      codigo: '4.2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const result = await prisma.item.createMany({ data });

  console.log('✅ Items insertados:', result);
}
