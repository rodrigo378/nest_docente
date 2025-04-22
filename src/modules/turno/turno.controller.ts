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
  Req,
  UseGuards,
} from '@nestjs/common';
import { TurnoService } from './turno.service';
import { UpdateTurnoDto } from './dto/updateTurnoDto';
import { CreateTurnoDto } from './dto/createTurnoDto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/interface/request.interface';

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

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateTurno(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTurnoDto: UpdateTurnoDto,
  ) {
    return this.turnoService.updateTurno(req.user.id, id, updateTurnoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  createTurno(
    @Req() req: AuthenticatedRequest,
    @Body() createTurnoDto: CreateTurnoDto,
  ) {
    return this.turnoService.createTurno(req.user.id, createTurnoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteTurno(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.turnoService.deleteTurno(req.user.id, id);
  }
}
