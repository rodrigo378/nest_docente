import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/updateUserDto';
import * as argon2 from 'argon2'; // Asegúrate de tenerlo importado

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

  async updateUser(updateUserDto: UpdateUserDto) {
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

    return updatedUser;
  }
}
