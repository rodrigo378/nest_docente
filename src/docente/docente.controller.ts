import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { DocenteService } from './docente.service';
import { CreateDocenteDto } from './dto/createDocenteDto';
import { UpdateDocenteDto } from './dto/updateDocenteDto';

@Controller('docente')
export class DocenteController {
  constructor(private readonly docenteService: DocenteService) {}

  @Post('')
  createDocente(@Body() createDocenteDto: CreateDocenteDto) {
    return this.docenteService.createDocente(createDocenteDto);
  }

  @Get('')
  getDocentes() {
    return this.docenteService.getDocente();
  }

  @Patch(':id')
  updateDocente(
    @Param('id') id: string,
    @Body() updateDocenteDto: UpdateDocenteDto,
  ) {
    return this.docenteService.updateDocente(Number(id), updateDocenteDto);
  }
}
