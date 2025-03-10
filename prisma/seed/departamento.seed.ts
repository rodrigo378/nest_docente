import { PrismaClient, Departamento } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedDepartamentos() {
  console.log('🌱 Seeding Departamentos...');

  const data: Omit<Departamento, 'id'>[] = [
    {
      nombre: 'Amazonas',
    },
    {
      nombre: 'Áncash',
    },
    {
      nombre: 'Apurímac',
    },

    {
      nombre: 'Arequipa',
    },

    {
      nombre: 'Ayacucho',
    },

    {
      nombre: 'Cajamarca',
    },

    {
      nombre: 'Callao',
    },

    {
      nombre: 'Cusco',
    },

    {
      nombre: 'Huancavelica',
    },

    {
      nombre: 'Huánuco',
    },

    {
      nombre: 'Ica',
    },

    {
      nombre: 'Junín',
    },

    {
      nombre: 'La Libertad',
    },

    {
      nombre: 'Lambayeque',
    },

    {
      nombre: 'Lima',
    },

    {
      nombre: 'Loreto',
    },

    {
      nombre: 'Madre de Dios',
    },

    {
      nombre: 'Moquegua',
    },

    {
      nombre: 'Pasco',
    },

    {
      nombre: 'Piura',
    },

    {
      nombre: 'Puno',
    },

    {
      nombre: 'San Martín',
    },

    {
      nombre: 'Tacna',
    },

    {
      nombre: 'Tumbes',
    },

    {
      nombre: 'Ucayali',
    },
  ];

  const result = await prisma.departamento.createMany({ data });

  console.log('✅ Departamentos insertados:', result);
}
