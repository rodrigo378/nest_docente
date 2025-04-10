import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsuarios() {
    return await this.prismaService.user.findMany({
      select: {
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
}
