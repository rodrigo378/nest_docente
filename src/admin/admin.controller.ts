import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreatePermisosDto } from './dto/createPermisosDto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('permisos')
  createPermisos(@Body() createPermisosDto: CreatePermisosDto) {
    return this.adminService.actualizarPermisos(createPermisosDto);
  }
}
