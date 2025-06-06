import {
  Get,
  Put,
  Req,
  Post,
  Body,
  Param,
  UseGuards,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';
import { PeriodoService } from './periodo.service';
import { CreatePeriodoDto } from './dto/createPeriodoDto';
import { UpdatePeriodoDto } from './dto/updatePeriodoDto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/interface/request.interface';

@Controller('periodo')
export class PeriodoController {
  constructor(private readonly periodoService: PeriodoService) {}

  @Get('')
  getPeriodo() {
    return this.periodoService.getPeriodo();
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  createPeriodo(
    @Req() req: AuthenticatedRequest,
    @Body() createPeriodoDto: CreatePeriodoDto,
  ) {
    return this.periodoService.createPeriodo(req.user.id, createPeriodoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':n_codper')
  updatePeriodo(
    @Req() req: AuthenticatedRequest,
    @Param('n_codper', ParseIntPipe) n_codper: number,
    @Body() updatePeriodoDto: UpdatePeriodoDto,
  ) {
    return this.periodoService.updatePeriodo(
      req.user.id,
      n_codper,
      updatePeriodoDto,
    );
  }
}
