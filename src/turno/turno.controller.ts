import {
  Body,
  Controller,
  Delete,
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
import { CreateTurnoDto } from './dto/createTurnoDto';
import { updateHorarioDto } from './dto/updateHorarioDto';
import { AsignarCursoTransversalDto } from './dto/asignarCursoTransversal';
import { DeleteHorarioArrayDto } from './dto/deleteHorarioArrayDto';

@Controller('')
export class TurnoController {
  constructor(private readonly turnoService: TurnoService) {}

  @Get('/turno')
  getTurnos(
    @Query('c_codfac') c_codfac?: string,
    @Query('c_codesp') c_codesp?: string,
    @Query('c_codmod') c_codmod?: string,
    @Query('c_codper') c_codper?: string,
    @Query('c_codpla') c_codpla?: string,
    @Query('estado') estado?: number,
  ) {
    return this.turnoService.getTurnos(
      c_codfac,
      c_codesp,
      c_codmod,
      Number(c_codper),
      Number(c_codpla),
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

  @Post('/turno')
  createTurno(@Body() createTurnoDto: CreateTurnoDto) {
    return this.turnoService.createTurno(createTurnoDto);
  }

  @Delete('/turno/:id')
  deleteTurno(@Param('id', ParseIntPipe) id: number) {
    return this.turnoService.deleteTurno(id);
  }

  // horarios
  @Post('/horario/transversal')
  asociarHorarioTransversal(
    @Body() asignarCursoTransversalDto: AsignarCursoTransversalDto,
  ) {
    return this.turnoService.asociarHorarioTransversal(
      asignarCursoTransversalDto,
    );
  }

  @Post('/horario')
  createHorario(@Body() createHorarioDto: CreateHorarioDto) {
    return this.turnoService.createHorario(createHorarioDto);
  }

  @Put('/horario')
  updateHorario(@Body() updateHorarioDto: updateHorarioDto) {
    return this.turnoService.updateHorario(updateHorarioDto);
  }

  @Get('/horario')
  getHorario(
    @Query('c_codmod') c_codmod?: string,
    @Query('c_codper') c_codper?: string,
    @Query('c_codfac') c_codfac?: string,
    @Query('c_codesp') c_codesp?: string,
    @Query('n_codpla') n_codpla?: string,
  ) {
    return this.turnoService.getHorarios(
      c_codmod,
      Number(c_codper),
      c_codfac,
      c_codesp,
      Number(n_codpla),
    );
  }

  @Get('/horario/:turno_id')
  getHorarios(@Param('turno_id', ParseIntPipe) turno_id: number) {
    return this.turnoService.getHorario(turno_id);
  }

  @Delete('/horario/array')
  deleteHorarioArray(@Body() deleteHorarioArray: DeleteHorarioArrayDto) {
    return this.turnoService.deleteHorarioArray(deleteHorarioArray);
  }

  @Delete('/horario/:id')
  deleteHorario(@Param('id', ParseIntPipe) id: number) {
    return this.turnoService.deleteHorario(id);
  }

  //aulas
  @Get('/aula')
  getAulas() {
    return this.turnoService.getAulas();
  }
}
