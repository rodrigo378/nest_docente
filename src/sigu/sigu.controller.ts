import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SiguService } from './sigu.service';
import { GetCursoDto } from './dto/getCursoDto';

@Controller('sigu')
export class SiguController {
  constructor(private readonly siguService: SiguService) {}

  @Get('especialidades')
  async getEspecialidades() {
    return await this.siguService.getEspecialidades();
  }

  @Get('/carreras-ciclo')
  async getCarreras(
    @Query('n_ciclo') c_ciclo: string,
    @Query('c_codfac') c_codfac: string,
  ) {
    if (!c_codfac || !c_ciclo) {
      return {
        error: 'Los parámetros c_codfac y c_ciclo son obligatorios',
      };
    }
    return await this.siguService.getCarreras(Number(c_ciclo), c_codfac);
  }

  @Post()
  async getCursos(@Body() getCursosDto: GetCursoDto) {
    return await this.siguService.getCursos(getCursosDto);
  }

  @Get('equi')
  async getEquivalencias() {
    return await this.siguService.getEquivalencias();
  }
}
