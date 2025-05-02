import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MarcarEntradaDto } from './dto/marcarAsistenciaDto';

@Injectable()
export class AsistenciaService {
  constructor(private readonly prismaService: PrismaService) {}

  async marcarEntrada(marcarEntradaDto: MarcarEntradaDto) {
    const { docente_id, aula_id } = marcarEntradaDto;
    const ahora = new Date();
    const soloFecha = new Date(ahora.toISOString().split('T')[0]);
    const dia = ahora.toLocaleDateString('es-PE', { weekday: 'long' });

    const asistenciaExistente = await this.prismaService.asistencia.findFirst({
      where: {
        tipo: 'entrada',
        docenteId: docente_id,
        aulaId: aula_id,
        fecha: soloFecha,
        dia,
        salidaId: null,
      },
      include: { salida: true },
    });

    if (asistenciaExistente) {
      throw new ConflictException('Ya tiene una entrada activa');
    }

    const newEntrada = await this.prismaService.asistencia.create({
      data: {
        docenteId: docente_id,
        aulaId: aula_id,
        fecha: soloFecha,
        dia,
        hora: ahora,
        tipo: 'entrada',
      },
    });

    return newEntrada;
  }

  async marcarSalida(marcarEntradaDto: MarcarEntradaDto) {
    const { docente_id, aula_id } = marcarEntradaDto;
    const ahora = new Date();
    const soloFecha = new Date(ahora.toISOString().split('T')[0]);
    const dia = ahora.toLocaleDateString('es-PE', { weekday: 'long' });

    const asistenciaExistente = await this.prismaService.asistencia.findFirst({
      where: {
        tipo: 'entrada',
        docenteId: docente_id,
        aulaId: aula_id,
        fecha: soloFecha,
        dia,
      },
      orderBy: {
        id: 'desc',
      },
      include: { salida: true },
    });

    if (!asistenciaExistente) {
      throw new ConflictException('No tienen una entrada activa');
    }

    if (asistenciaExistente.salida !== null) {
      throw new ConflictException('Ya marco salida para esta entrada');
    }

    const newAsistencia = await this.prismaService.asistencia.create({
      data: {
        docenteId: docente_id,
        aulaId: aula_id,
        fecha: soloFecha,
        dia: dia,
        hora: ahora,
        tipo: 'salida',
      },
    });

    await this.prismaService.asistencia.update({
      where: {
        id: asistenciaExistente?.id,
      },
      data: {
        salidaId: newAsistencia.id,
      },
    });

    return newAsistencia;
  }

  async getAsistenciaDocente(docente_id: number) {
    const ahora = new Date();
    const soloFecha = new Date(ahora.toISOString().split('T')[0]);
    const dia = ahora.toLocaleDateString('es-PE', { weekday: 'long' });

    if (
      !(await this.prismaService.docente.findUnique({
        where: {
          id: docente_id,
        },
      }))
    ) {
      throw new NotFoundException('Este docente no exite');
    }

    const asistencias = await this.prismaService.asistencia.findMany({
      where: {
        docenteId: docente_id,
        fecha: soloFecha,
        dia,
      },
      include: {
        aula: true,
      },
    });

    return asistencias;
  }
}
