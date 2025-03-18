import { Controller, Get } from '@nestjs/common';
import { EspecialidadesService } from './especialidades.service';

@Controller('especialidades')
export class EspecialidadesController {
    constructor(private readonly especialidadService: EspecialidadesService){}

    @Get("especialidades")
    async getEspecialidades(){
        return await this.especialidadService.obtenerEspecialidades();
    }
}
