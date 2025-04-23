import { PrismaClient, AuthProvider } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

export async function seedUsers() {
  console.log('🌱 Seeding Users...');

  const hashedPassword = await argon2.hash('xyz123');

  const data = [
    {
      nombre: 'ti',
      apellido: 'ti',
      genero: 'M',
      grado: 'tec',
      estado: 'A',
      email: 'ti@uma.edu.pe',
      password: hashedPassword,
      googleId: null,
      microsoftId: null,
      authProvider: AuthProvider.LOCAL,
    },
  ];

  const result = await prisma.user.createMany({
    data,
    skipDuplicates: true,
  });

  console.log('✅ Usuarios insertados:', result);
}
