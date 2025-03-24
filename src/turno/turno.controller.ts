import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TurnoService } from './turno.service';
import { UpdateTurnoDto } from './dto/updateTurnoDto';
import { CreateHorarioDto } from './dto/createHorarioDto';
import { UpsertManyHorarioDto } from './dto/updateHorarioDto';

@Controller('')
export class TurnoController {
  constructor(private readonly turnoService: TurnoService) {}

  @Get('/turno')
  getTurnos(
    @Query('c_codfac') c_codfac?: string,
    @Query('c_codesp') c_codesp?: string,
    @Query('c_codmod') c_codmod?: string,
    @Query('n_ciclo') n_ciclo?: number,
    @Query('estado') estado?: number,
  ) {
    return this.turnoService.getTurnos(
      c_codfac,
      c_codesp,
      c_codmod,
      Number(n_ciclo),
      Number(estado),
    );
  }

  @Get('/turno/:id')
  getTurno(@Param('id', ParseIntPipe) id: number) {
    return this.turnoService.getTurno(id);
  }

  @Put('/turno/:id')
  updateTurno(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTurnoDto: UpdateTurnoDto,
  ) {
    return this.turnoService.updateTurno(id, updateTurnoDto);
  }

  // horarios
  @Post('/horario')
  createHorario(@Body() createHorarioDto: CreateHorarioDto) {
    return this.turnoService.createHorario(createHorarioDto);
  }

  @Put('/horario')
  updateHorario(@Body() updateHorarioDto: UpsertManyHorarioDto) {
    return this.turnoService.updateHorario(updateHorarioDto);
  }

  @Get('/horario/:turno_id')
  getHorarios(@Param('turno_id') turno_id: string) {
    return this.turnoService.getHorario(Number(turno_id));
  }
}
