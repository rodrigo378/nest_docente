import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { CreateHorarioDto } from './dto/createHorarioDto';
import { UpdateHorarioDto } from './dto/updateHorarioDto';

@Controller('horario')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}

  @Post('')
  createHorarios(@Body() createHorarioDto: CreateHorarioDto) {
    return this.horarioService.createHorario(createHorarioDto);
  }

  @Get()
  async getCursos(
    @Query('ciclo') ciclo: string,
    @Query('seccion') seccion: string,
  ) {
    if (!ciclo || !seccion) {
      return { error: 'Los parámetros ciclo y seccion son obligatorios' };
    }
    return await this.horarioService.getHorarios(ciclo, seccion);
  }

  @Put()
  async updateHorario(@Body() updateHorarioDto: UpdateHorarioDto) {
    return this.horarioService.updateHorario(updateHorarioDto);
  }
}
