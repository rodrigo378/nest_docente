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
import { AsignarCursoTransversalDto } from './dto/asignarHorarioTransversalDto';
import { DeleteHorarioArrayDto } from './dto/deleteHorarioArrayDto';
import { CreateHorarioArrayDto } from './dto/createHorarioArrayDto';
import { UpdateHorarioArrayDto } from './dto/updateHorarioArrayDto';

@Controller('horario')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}

  @Post('transversal')
  asociarHorarioTransversal(
    @Body() asignarCursoTransversalDto: AsignarCursoTransversalDto,
  ) {
    return this.horarioService.asociarHorarioTransversal(
      asignarCursoTransversalDto,
    );
  }

  @Post('')
  createHorario(@Body() createHorarioArrayDto: CreateHorarioArrayDto) {
    return this.horarioService.createHorario(createHorarioArrayDto);
  }

  @Put('')
  updateHorario(@Body() updateHorarioArrayDto: UpdateHorarioArrayDto) {
    return this.horarioService.updateHorario(updateHorarioArrayDto);
  }

  @Get('')
  getHorario(
    @Query('c_codmod') c_codmod?: string,
    @Query('c_codper') c_codper?: string,
    @Query('c_codfac') c_codfac?: string,
    @Query('c_codesp') c_codesp?: string,
    @Query('n_codpla') n_codpla?: string,
  ) {
    return this.horarioService.getHorarios(
      c_codmod,
      Number(c_codper),
      c_codfac,
      c_codesp,
      Number(n_codpla),
    );
  }

  @Get(':turno_id')
  getHorarios(@Param('turno_id', ParseIntPipe) turno_id: number) {
    return this.horarioService.getHorario(turno_id);
  }

  @Delete('array')
  deleteHorarioArray(@Body() deleteHorarioArray: DeleteHorarioArrayDto) {
    return this.horarioService.deleteHorarioArray(deleteHorarioArray);
  }

  @Delete(':id')
  deleteHorario(@Param('id', ParseIntPipe) id: number) {
    return this.horarioService.deleteHorario(id);
  }
}
