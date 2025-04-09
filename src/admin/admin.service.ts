import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePermisosDto } from './dto/createPermisosDto';
import { GetPermisoToDto } from './dto/getPermisoToDto';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async actualizarPermisos(createPermisosDto: CreatePermisosDto) {
    const { user_id, items_id } = createPermisosDto;

    // 1. Desactivar permisos que ya no están marcados
    await this.prismaService.permission.updateMany({
      where: {
        userId: user_id,
        itemId: {
          notIn: items_id,
        },
      },
      data: {
        estado: 'I',
      },
    });

    // 2. Activar o crear permisos marcados
    for (const itemId of items_id) {
      const permisoExistente = await this.prismaService.permission.findFirst({
        where: {
          userId: user_id,
          itemId: itemId,
        },
      });

      if (permisoExistente) {
        if (permisoExistente.estado !== 'A') {
          await this.prismaService.permission.update({
            where: { id: permisoExistente.id },
            data: { estado: 'A' },
          });
        }
      } else {
        await this.prismaService.permission.create({
          data: {
            userId: user_id,
            itemId: itemId,
            estado: 'A',
          },
        });
      }
    }

    return { message: 'Permisos actualizados correctamente.' };
  }

  async getPermisos(user_id: number) {
    return await this.prismaService.permission.findMany({
      where: {
        userId: user_id,
        estado: 'A',
      },
      select: {
        item: {
          select: {
            codigo: true,
            modulo: {
              select: {
                codigo: true,
              },
            },
          },
        },
      },
    });
  }

  async getPermisosTo(getPermisoTo: GetPermisoToDto) {
    const { email } = getPermisoTo;

    const user = await this.prismaService.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Este email no existe');
    }

    const permisos = await this.prismaService.permission.findMany({
      where: { userId: user.id },
    });

    return { permisos, user };
  }

  async getModulos() {
    return await this.prismaService.modulo.findMany({
      include: { Item: true },
    });
  }
}
