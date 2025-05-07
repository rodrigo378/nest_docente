import { AulaService } from './aula.service';
import { Controller, Get, Param, Query } from '@nestjs/common';

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

  @Get('/docente')
  getDocentesAula(
    @Query('aula_id') aula_id: string,
    @Query('dia') dia: string,
  ) {
    return this.aulaService.getDocentesAula(Number(aula_id), dia);
  }

  @Get(':ip')
  getAulaIp(@Param('ip') ip: string) {
    return this.aulaService.getAulaIp(ip);
  }
}
