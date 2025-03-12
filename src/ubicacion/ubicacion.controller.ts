import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UbicacionService } from './ubicacion.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth/jwt-auth.guard';

@Controller('ubicacion')
export class UbicacionController {
  constructor(private readonly ubicacionService: UbicacionService) {}

  @Get('departamento')
  @UseGuards(JwtAuthGuard)
  getDepartamentos() {
    return this.ubicacionService.getDepartamentos();
  }

  @Get('provincia/:departamento_id')
  @UseGuards(JwtAuthGuard)
  getPrincias(@Param('departamento_id') departamento_id: string) {
    return this.ubicacionService.getProvincias(Number(departamento_id));
  }

  @Get('distrito/:provincia_id')
  @UseGuards(JwtAuthGuard)
  getDistritos(@Param('provincia_id') provincia_id: string) {
    return this.ubicacionService.getDistrito(Number(provincia_id));
  }
}
