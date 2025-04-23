import {
  Get,
  Put,
  Req,
  Body,
  Param,
  UseGuards,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUserDto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/interface/request.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  getUsuarios() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('')
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.userService.updateUser(updateUserDto, req.user.id);
  }
}
