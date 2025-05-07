import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { periodoDto } from './dto/periodoDto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  @Get('1')
  dashboard_1(@Query() query: periodoDto) {
    const { n_codper } = query;

    return this.dashboardService.dashboard_1(n_codper);
  }

  @Get('docente')
  dash_Docente() {
    // @Query() query: periodoDto
    // const { n_codper } = query;
    return this.dashboardService.dash_Docente();
  }

  @Get('tipo_curso')
  dash_TipoCurso(@Query() query: periodoDto) {
    const { n_codper } = query;
    return this.dashboardService.dash_TipoCurso(n_codper);
  }

  @Get('estado_turno')
  dash_EstadoTurno(@Query() query: periodoDto) {
    const { n_codper } = query;
    return this.dashboardService.dash_EstadoTurno(n_codper);
  }
}
