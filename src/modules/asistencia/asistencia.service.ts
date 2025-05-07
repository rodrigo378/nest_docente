import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MarcarEntradaDto } from './dto/marcarAsistenciaDto';
import { Prisma } from '@prisma/client';

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

  async getAsistenciaDocente(
    docente_id: number,
    filtro: 'diario' | 'rango' | 'mensual',
    opciones: {
      fecha?: string; // diario
      desde?: string; // rango
      hasta?: string;
      mes?: string; // mensual (formato: "YYYY-MM")
    },
  ) {
    console.log('iniciar funcion getAsistenciaDocente');

    console.log('docente_id', docente_id);
    console.log('filtro', filtro);
    console.log('opciones', opciones);

    // Validación del docente
    const existeDocente = await this.prismaService.docente.findUnique({
      where: { id: docente_id },
    });

    if (!existeDocente) {
      throw new NotFoundException('Este docente no existe');
    }

    const where: Prisma.AsistenciaWhereInput = {
      docenteId: docente_id,
    };

    // Filtro diario
    if (filtro === 'diario' && opciones.fecha) {
      where.fecha = new Date(opciones.fecha);
    }

    // Filtro rango (solo si ambos están presentes)
    else if (filtro === 'rango' && opciones.desde && opciones.hasta) {
      where.fecha = {
        gte: new Date(opciones.desde),
        lte: new Date(opciones.hasta),
      };
    }

    // Filtro mensual (opcional)
    else if (filtro === 'mensual' && opciones.mes) {
      const [anio, mes] = opciones.mes.split('-').map(Number);
      const inicioMes = new Date(anio, mes - 1, 1);
      const finMes = new Date(anio, mes, 0);
      where.fecha = {
        gte: inicioMes,
        lte: finMes,
      };
    }

    const asistencias = await this.prismaService.asistencia.findMany({
      where,
      include: {
        aula: true,
      },
      orderBy: {
        fecha: 'asc',
      },
    });

    return asistencias;
  }
}
