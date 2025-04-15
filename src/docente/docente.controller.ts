import {
  Body,
  // Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DocenteService } from './docente.service';
import { CreateDocenteDto } from './dto/createDocenteDto';
import { UpdateDocenteDto } from './dto/updateDocenteDto';

@Controller('docente')
export class DocenteController {
  constructor(private readonly docenteService: DocenteService) {}

  @Get('')
  getDocentes(
    @Query('horario') horario?: boolean,
    @Query('curso') curso?: boolean,
    @Query('aula') aula?: boolean,
  ) {
    return this.docenteService.getDocentes(horario, curso, aula);
  }

  @Get(':id')
  getDocente(
    @Param('id', ParseIntPipe) id: number,
    @Query('horario') horario?: boolean,
    @Query('curso') curso?: boolean,
    @Query('aula') aula?: boolean,
  ) {
    return this.docenteService.getDocente(id, horario, curso, aula);
  }

  @Post('')
  createDocente(@Body() createDocenteDto: CreateDocenteDto) {
    return this.docenteService.createDocente(createDocenteDto);
  }

  @Put('')
  updateDocente(@Body() updateDocenteDto: UpdateDocenteDto) {
    return this.docenteService.updateDocente(updateDocenteDto);
  }
  // @Post('')
  // @UseGuards(JwtAuthGuard)
  // createDocente(
  //   @Body() createDocenteDto: CreateDocenteDto,
  //   @Req() req: AuthenticatedRequest,
  // ) {
  //   return this.docenteService.createDocente(createDocenteDto, req.user.id);
  // }

  // @Get('')
  // @UseGuards(JwtAuthGuard)
  // getDocentes() {
  //   return this.docenteService.getDocentes();
  // }

  // @Get('user')
  // @UseGuards(JwtAuthGuard)
  // getDocenteUser(@Req() req: AuthenticatedRequest) {
  //   return this.docenteService.getDocenteUser(req.user.id);
  // }

  // @Get(':id')
  // @UseGuards(JwtAuthGuard)
  // getDocente(@Param('id') id: string) {
  //   return this.docenteService.getDocente(Number(id));
  // }

  // @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  // updateDocente(
  //   @Param('id') id: string,
  //   @Body() updateDocenteDto: UpdateDocenteDto,
  // ) {
  //   return this.docenteService.updateDocente(Number(id), updateDocenteDto);
  // }
}
