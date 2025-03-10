import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UbicacionService {
  constructor(private readonly prismaService: PrismaService) {}

  async getDepartamentos() {
    try {
      const departamentos = await this.prismaService.departamento.findMany();
      return departamentos;
    } catch (error) {
      console.error('❌ Error al obtener departamentos:', error);
      throw new Error('No se pudieron obtener los departamentos.');
    }
  }

  async getProvincias(departamento_id: number) {
    try {
      const provincias = await this.prismaService.provincia.findMany({
        where: { departamento_id },
      });
      return provincias;
    } catch (error) {
      console.error('❌ Error al obtener provincias:', error);
      throw new Error('No se pudieron obtener los provincias.');
    }
  }

  async getDistrito(provincia_id: number) {
    try {
      const distritos = await this.prismaService.distrito.findMany({
        where: { provincia_id },
      });
      return distritos;
    } catch (error) {
      console.error('❌ Error al obtener distritos:', error);
      throw new Error('No se pudieron obtener los distritos.');
    }
  }
}
