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
import { HorarioService } from './horario.service';
import { DeleteHorarioArrayDto } from './dto/deleteHorarioArrayDto';
import { CreateHorarioArrayDto } from './dto/createHorarioArrayDto';
import { UpdateHorarioArrayDto } from './dto/updateHorarioArrayDto';
import { CreateTransversalDto } from './dto/createTransversalDto';
import { CreateHorarioAsyncDto } from './dto/createHorarioAsyncDto';

@Controller('horario')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}

  @Post('')
  createHorarioArray(@Body() createHorarioArray: CreateHorarioArrayDto) {
    return this.horarioService.createHorarioArray(createHorarioArray);
  }

  @Post('async')
  createHorarioAsync(@Body() crcreateHorarioAsyncDto: CreateHorarioAsyncDto) {
    return this.horarioService.createHorarioAsync(crcreateHorarioAsyncDto);
  }

  @Delete('')
  deleteHorarioArray(@Body() deleteHorarioArray: DeleteHorarioArrayDto) {
    return this.horarioService.deleteHorarioArray(deleteHorarioArray);
  }

  @Put('')
  updateHorarioArray(@Body() updateHorarioArrayDto: UpdateHorarioArrayDto) {
    return this.horarioService.updateHorarioArray(updateHorarioArrayDto);
  }

  @Get('/turno/:turno_id')
  getHorariosTurno(@Param('turno_id', ParseIntPipe) turno_id: number) {
    return this.horarioService.getHorariosTurno(turno_id);
  }

  @Get('curso')
  getCurso(
    @Query('c_codmod') c_codmod?: string,
    @Query('n_codper') n_codper?: string,
    @Query('c_codfac') c_codfac?: string,
    @Query('c_codesp') c_codesp?: string,
    @Query('c_codcur') c_codcur?: string,
    @Query('turno_id') turno_id?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.horarioService.getCursos(
      Number(c_codmod),
      n_codper,
      c_codfac,
      c_codesp,
      c_codcur,
      turno_id ? Number(turno_id) : undefined,
      skip ? Number(skip) : undefined,
      skip ? Number(take) : undefined,
    );
  }

  @Get(':id')
  getHorario(@Param('id', ParseIntPipe) id: number) {
    return this.horarioService.getHorario(id);
  }

  @Post('curso/transversal')
  createTransversal(@Body() createTransversalDto: CreateTransversalDto) {
    return this.horarioService.createCursoTransversal(createTransversalDto);
  }

  @Post('curso/grupo')
  createGrupo(@Body() createTransversalDto: CreateTransversalDto) {
    return this.horarioService.createCursoGrupo(createTransversalDto);
  }

  @Delete('curso/transversal/:padre_curso_id')
  deleteTransversal(
    @Param('padre_curso_id', ParseIntPipe) padre_curso_id: number,
  ) {
    return this.horarioService.deleteAgrupado(padre_curso_id);
  }
}
