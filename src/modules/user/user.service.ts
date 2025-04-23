import * as argon2 from 'argon2';
import { UpdateUserDto } from './dto/updateUserDto';
import { createLog } from 'src/common/utils/log.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers() {
    return await this.prismaService.user.findMany({
      select: {
        id: true,
        nombre: true,
        apellido: true,
        genero: true,
        grado: true,
        estado: true,
        email: true,
        authProvider: true,
      },
    });
  }

  async getUser(id: number) {
    return await this.prismaService.user.findMany({
      where: { id },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        genero: true,
        grado: true,
        estado: true,
        email: true,
      },
    });
  }

  //se agrego log
  async updateUser(updateUserDto: UpdateUserDto, user_id: number) {
    const { id, password, ...rest } = updateUserDto;

    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    let hashedPassword: string | undefined;

    if (password) {
      hashedPassword = await argon2.hash(password);
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        ...rest,
        ...(hashedPassword && { password: hashedPassword }),
        updatedAt: new Date(),
      },
    });

    await createLog(
      this.prismaService,
      user_id,
      'user',
      'UPDATE',
      'Se actualizó el usuario',
      null,
      user,
      updatedUser,
    );

    return updatedUser;
  }
}
