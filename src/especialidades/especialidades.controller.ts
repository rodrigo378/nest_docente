import { Controller, Get, Query } from '@nestjs/common';
import { EspecialidadesService } from './especialidades.service';

@Controller('especialidades')
export class EspecialidadesController {
  constructor(private readonly especialidadService: EspecialidadesService) {}

  @Get('especialidades')
  async getEspecialidades() {
    return await this.especialidadService.obtenerEspecialidades();
  }

  // 🔹 Endpoint para obtener Carreras y Ciclos según Facultad
  @Get('carreras-ciclos')
  async getCarrerasYCiclos(@Query('c_codfac') c_codfac: string) {
    if (!c_codfac) {
      return { error: 'El parámetro c_codfac es obligatorio' };
    }
    return await this.especialidadService.obtenerCarrerasYCiclos(c_codfac);
  }

  // 🔹 Endpoint para obtener Cursos según Facultad y Ciclo
  @Get('cursos')
  async getCursos(
    @Query('c_codfac') c_codfac: string,
    @Query('c_ciclo') c_ciclo: string,
  ) {
    if (!c_codfac || !c_ciclo) {
      return { error: 'Los parámetros c_codfac y c_ciclo son obligatorios' };
    }
    return await this.especialidadService.obtenerCursos(c_codfac, c_ciclo);
  }
}
