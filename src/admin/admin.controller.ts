import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreatePermisosDto } from './dto/createPermisosDto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/interface/request.interface';
import { GetPermisoToDto } from './dto/getPermisoToDto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('permisos')
  createPermisos(@Body() createPermisosDto: CreatePermisosDto) {
    return this.adminService.actualizarPermisos(createPermisosDto);
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
}
