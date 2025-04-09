import { Controller, Get, Query } from '@nestjs/common';
import { AulaService } from './aula.service';

@Controller('aula')
export class AulaController {
  constructor(private readonly aulaService: AulaService) {}

  @Get('')
  getAulas(
    @Query('horario') horario?: boolean,
    @Query('curso') curso?: boolean,
    @Query('docente') docente?: boolean,
  ) {
    return this.aulaService.getAulas(horario, curso, docente);
  }
}
