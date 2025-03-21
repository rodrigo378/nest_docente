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

  @Put('/turno/:id')
  async updateTurno(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTurnoDto: UpdateTurnoDto,
  ) {
    return await this.turnoService.updateTurno(id, updateTurnoDto);
  }

  // horarios
  @Post('/horario')
  createHorario(@Body() createHorarioDto: CreateHorarioDto) {
    return this.turnoService.createHorario(createHorarioDto);
  }

  @Get('/horario/:turno_id')
  getHorarios(@Param('turno_id') turno_id: string) {
    return this.turnoService.getHorario(Number(turno_id));
  }
}
