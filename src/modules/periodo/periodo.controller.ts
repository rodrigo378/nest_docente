import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PeriodoService } from './periodo.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth/jwt-auth.guard';
import { CreatePeriodoDto } from './dto/createPeriodoDto';
import { AuthenticatedRequest } from '../auth/interface/request.interface';
import { UpdatePeriodoDto } from './dto/updatePeriodoDto';

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
