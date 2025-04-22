import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  @Get('1')
  dashboard_1() {
    return this.dashboardService.dashboard_1();
  }

  @Get('docente')
  dash_Docente() {
    return this.dashboardService.dash_Docente();
  }

  @Get('tipo_curso')
  dash_TipoCurso() {
    return this.dashboardService.dash_TipoCurso();
  }

  @Get('estado_turno')
  dash_EstadoTurno() {
    return this.dashboardService.dash_EstadoTurno();
  }
}
