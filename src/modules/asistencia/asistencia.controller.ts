import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { MarcarEntradaDto } from './dto/marcarAsistenciaDto';

@Controller('asistencia')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

  @Post('entrada')
  marcarEntrada(@Body() marcarEntradaDto: MarcarEntradaDto) {
    return this.asistenciaService.marcarEntrada(marcarEntradaDto);
  }

  @Post('salida')
  marcarSalida(@Body() marcarEntradaDto: MarcarEntradaDto) {
    return this.asistenciaService.marcarSalida(marcarEntradaDto);
  }

  @Get('docente/:docente_id')
  getAsistenciaDocente(
    @Param('docente_id') docente_id: string,
    @Query('filtro') filtro: 'diario' | 'rango' | 'mensual',
    @Query('fecha') fecha?: string,
    @Query('desde') desde?: string,
    @Query('hasta') hasta?: string,
    @Query('mes') mes?: string,
  ) {
    return this.asistenciaService.getAsistenciaDocente(
      Number(docente_id),
      filtro,
      {
        fecha,
        desde,
        hasta,
        mes,
      },
    );
  }
}
