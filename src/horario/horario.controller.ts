import { Body, Controller, Post } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { CreateHorarioDto } from './dto/createHorarioDto';

@Controller('horario')
export class HorarioController {
  constructor(private readonly hoarioService: HorarioService) {}

  @Post('')
  createHorarios(@Body() createHorarioDto: CreateHorarioDto) {
    return this.hoarioService.createHorario(createHorarioDto);
  }
}
