import { Controller, Get } from '@nestjs/common';
import { PeriodoService } from './periodo.service';

@Controller('periodo')
export class PeriodoController {
  constructor(private readonly periodoService: PeriodoService) {}

  @Get('')
  getPeriodo() {
    return this.periodoService.getPeriodo();
  }
}
