import {
  Put,
  Req,
  Get,
  Body,
  Post,
  Query,
  Param,
  Delete,
  UseGuards,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';
import { HorarioService } from './horario.service';
import { CreateTransversalDto } from './dto/createTransversalDto';
import { DeleteHorarioArrayDto } from './dto/deleteHorarioArrayDto';
import { CreateHorarioArrayDto } from './dto/createHorarioArrayDto';
import { UpdateHorarioArrayDto } from './dto/updateHorarioArrayDto';
import { CreateHorarioAsyncDto } from './dto/createHorarioAsyncDto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/interface/request.interface';

@Controller('horario')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}

  @Get('reporte')
  getReporte(
    @Query('n_codper') n_codper?: string,
    @Query('c_codfac') c_codfac?: string,
    @Query('c_codesp') c_codesp?: string,
    @Query('c_grpcur') c_grpcur?: string,
    @Query('c_codmod') c_codmod?: string,
    @Query('n_ciclo') n_ciclo?: string,
    @Query('n_codpla') n_codpla?: string,
  ) {
    const filtros = {
      n_codper: n_codper !== undefined ? Number(n_codper) : undefined,
      c_codfac,
      c_codesp,
      c_grpcur,
      c_codmod,
      n_ciclo: n_ciclo !== undefined ? Number(n_ciclo) : undefined,
      n_codpla: n_codpla !== undefined ? Number(n_codpla) : undefined,
    };

    return this.horarioService.getReporte(filtros);
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  createHorarioArray(
    @Req() req: AuthenticatedRequest,
    @Body() createHorarioArray: CreateHorarioArrayDto,
  ) {
    return this.horarioService.createHorarioArray(
      req.user.id,
      createHorarioArray,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('async')
  createHorarioAsync(
    @Req() req: AuthenticatedRequest,
    @Body() crcreateHorarioAsyncDto: CreateHorarioAsyncDto,
  ) {
    return this.horarioService.createHorarioAsync(
      req.user.id,
      crcreateHorarioAsyncDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('')
  deleteHorarioArray(
    @Req() req: AuthenticatedRequest,
    @Body() deleteHorarioArray: DeleteHorarioArrayDto,
  ) {
    return this.horarioService.deleteHorarioArray(
      req.user.id,
      deleteHorarioArray,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('')
  updateHorarioArray(
    @Req() req: AuthenticatedRequest,
    @Body() updateHorarioArrayDto: UpdateHorarioArrayDto,
  ) {
    return this.horarioService.updateHorarioArray(
      req.user.id,
      updateHorarioArrayDto,
    );
  }

  @Get('/turno/:turno_id')
  getHorariosTurno(@Param('turno_id', ParseIntPipe) turno_id: number) {
    return this.horarioService.getHorariosTurno(turno_id);
  }

  @Get('curso')
  getCurso(
    @Query('c_codmod') c_codmod?: string,
    @Query('n_codper') n_codper?: string,
    @Query('periodo') periodo?: string,
    @Query('c_codfac') c_codfac?: string,
    @Query('c_codesp') c_codesp?: string,
    @Query('c_codcur') c_codcur?: string,
    @Query('n_ciclo') n_ciclo?: string,
    @Query('turno_id') turno_id?: string,
    @Query('filtroBusqueda') filtroBusqueda?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('sortField') sortField?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
  ) {
    return this.horarioService.getCursos(
      Number(c_codmod),
      n_codper,
      Number(periodo),
      c_codfac,
      c_codesp,
      c_codcur,
      n_ciclo ? Number(n_ciclo) : undefined,
      turno_id ? Number(turno_id) : undefined,
      filtroBusqueda,
      skip ? Number(skip) : undefined,
      take ? Number(take) : undefined,
      sortField,
      sortOrder || 'asc',
    );
  }

  @Get(':id')
  getHorario(@Param('id', ParseIntPipe) id: number) {
    return this.horarioService.getHorario(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('curso/transversal')
  createTransversal(
    @Req() req: AuthenticatedRequest,
    @Body() createTransversalDto: CreateTransversalDto,
  ) {
    return this.horarioService.createCursoTransversal(
      req.user.id,
      createTransversalDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('curso/grupo')
  createGrupo(
    @Req() req: AuthenticatedRequest,
    @Body() createTransversalDto: CreateTransversalDto,
  ) {
    return this.horarioService.createCursoGrupo(
      req.user.id,
      createTransversalDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('curso/transversal/:padre_curso_id')
  deleteTransversal(
    @Req() req: AuthenticatedRequest,
    @Param('padre_curso_id', ParseIntPipe) padre_curso_id: number,
  ) {
    return this.horarioService.deleteAgrupado(req.user.id, padre_curso_id);
  }
}
