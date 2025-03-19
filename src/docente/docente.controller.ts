import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DocenteService } from './docente.service';
import { CreateDocenteDto } from './dto/createDocenteDto';
import { UpdateDocenteDto } from './dto/updateDocenteDto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/interface/request.interface';

@Controller('docente')
export class DocenteController {
  constructor(private readonly docenteService: DocenteService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  createDocente(
    @Body() createDocenteDto: CreateDocenteDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.docenteService.createDocente(createDocenteDto, req.user.id);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  getDocentes() {
    return this.docenteService.getDocentes();
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  getDocenteUser(@Req() req: AuthenticatedRequest) {
    return this.docenteService.getDocenteUser(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getDocente(@Param('id') id: string) {
    return this.docenteService.getDocente(Number(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateDocente(
    @Param('id') id: string,
    @Body() updateDocenteDto: UpdateDocenteDto,
  ) {
    return this.docenteService.updateDocente(Number(id), updateDocenteDto);
  }
}
