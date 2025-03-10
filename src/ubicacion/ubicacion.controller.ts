import { Controller, Get, Param } from '@nestjs/common';
import { UbicacionService } from './ubicacion.service';

@Controller('ubicacion')
export class UbicacionController {
  constructor(private readonly ubicacionService: UbicacionService) {}

  @Get('departamento')
  getDepartamentos() {
    return this.ubicacionService.getDepartamentos();
  }

  @Get('provincia/:departamento_id')
  getPrincias(@Param('departamento_id') departamento_id: string) {
    return this.ubicacionService.getProvincias(Number(departamento_id));
  }

  @Get('distrito/:provincia_id')
  getDistritos(@Param('provincia_id') provincia_id: string) {
    return this.ubicacionService.getDistrito(Number(provincia_id));
  }
}
