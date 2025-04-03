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
import { CreateTurnoDto } from './dto/createTurnoDto';

@Controller('turno')
export class TurnoController {
  constructor(private readonly turnoService: TurnoService) {}

  @Get('')
  getTurnos(
    @Query('c_codfac') c_codfac?: string,
    @Query('c_codesp') c_codesp?: string,
    @Query('c_codmod') c_codmod?: number,
    @Query('c_codper') c_codper?: string,
    @Query('c_codpla') c_codpla?: string,
    @Query('n_ciclo') n_ciclo?: number,
    @Query('estado') estado?: number,
  ) {
    return this.turnoService.getTurnos(
      c_codfac,
      c_codesp,
      Number(c_codmod),
      Number(c_codper),
      Number(c_codpla),
      Number(n_ciclo),
      Number(estado),
    );
  }

  @Get(':id')
  getTurno(@Param('id', ParseIntPipe) id: number) {
    return this.turnoService.getTurno(id);
  }

  @Put(':id')
  updateTurno(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTurnoDto: UpdateTurnoDto,
  ) {
    return this.turnoService.updateTurno(id, updateTurnoDto);
  }

  @Post('')
  createTurno(@Body() createTurnoDto: CreateTurnoDto) {
    return this.turnoService.createTurno(createTurnoDto);
  }

  @Delete(':id')
  deleteTurno(@Param('id', ParseIntPipe) id: number) {
    return this.turnoService.deleteTurno(id);
  }
}
