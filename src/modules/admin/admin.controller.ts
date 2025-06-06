import { AdminService } from './admin.service';
import { GetPermisoToDto } from './dto/getPermisoToDto';
import { CreatePermisosDto } from './dto/createPermisosDto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/interface/request.interface';
import {
  Body,
  Controller,
  Get,
  Ip,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(JwtAuthGuard)
  @Post('permisos')
  createPermisos(
    @Req() req: AuthenticatedRequest,
    @Body() createPermisosDto: CreatePermisosDto,
  ) {
    return this.adminService.actualizarPermisos(req.user.id, createPermisosDto);
  }

  @Get('permisos/me')
  @UseGuards(JwtAuthGuard)
  getMisPermisos(@Req() req: AuthenticatedRequest) {
    return this.adminService.getPermisos(req.user.id);
  }

  @Post('permisos/to')
  getPermisosTo(@Body() getPermisoTo: GetPermisoToDto) {
    return this.adminService.getPermisosTo(getPermisoTo);
  }

  @Get('modulo')
  getModulos() {
    return this.adminService.getModulos();
  }

  @Get('ip')
  getClientIp(@Ip() ip: string) {
    ip = ip.replace('::ffff:', '');
    return { ip };
  }
}
