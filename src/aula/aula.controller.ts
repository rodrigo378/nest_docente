import { Controller, Get } from '@nestjs/common';
import { AulaService } from './aula.service';

@Controller('aula')
export class AulaController {
  constructor(private readonly aulaService: AulaService) {}

  @Get('')
  getAulas() {
    return this.aulaService.getAulas();
  }
}
