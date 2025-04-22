import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export async function createLog(
  prisma: PrismaService,
  userId: number | null,
  entidad: string,
  accion: string,
  descripcion: string,
  ip: string | null,
  before: Prisma.InputJsonValue = {},
  after: Prisma.InputJsonValue = {},
) {
  try {
    await prisma.log.create({
      data: {
        userId,
        entidad,
        accion,
        descripcion,
        ip,
        before,
        after,
      },
    });
  } catch (error) {
    console.error('Error registrando log:', error);
  }
}
