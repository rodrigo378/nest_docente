import { SiguService } from './sigu.service';
import { Controller, Get } from '@nestjs/common';

@Controller('sigu')
export class SiguController {
  constructor(private readonly siguService: SiguService) {}

  @Get('especialidades')
  async getEspecialidades() {
    return await this.siguService.getEspecialidades();
  }
}
