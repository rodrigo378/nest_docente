import { Controller, Get, Query } from '@nestjs/common';
import { CursoService } from './curso.service';

@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Get('especialidades')
  async getEspecialidades() {
    return await this.cursoService.getEspecialidades();
  }

  @Get('carreras-ciclos')
  async getCarrerasYCiclos(@Query('c_codfac') c_codfac: string) {
    if (!c_codfac) {
      return { error: 'El parámetro c_codfac es obligatorio' };
    }
    return await this.cursoService.getCicloCarreras(c_codfac);
  }

  @Get()
  async getCursos(
    @Query('c_codfac') c_codfac: string,
    @Query('c_ciclo') c_ciclo: string,
  ) {
    if (!c_codfac || !c_ciclo) {
      return { error: 'Los parámetros c_codfac y c_ciclo son obligatorios' };
    }
    return await this.cursoService.getCursos(c_codfac, c_ciclo);
  }
}
