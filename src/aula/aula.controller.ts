import { Controller, Get } from '@nestjs/common';
import { AulaService } from './aula.service';

@Controller('aula')
export class AulaController {
  constructor(private readonly aulaService: AulaService) {}

  @Get('/aula')
  getAulas() {
    return this.aulaService.getAulas();
  }
}
