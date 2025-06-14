import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { PlanService } from './plan.service';
import { UpdateCursoPlanDto } from './dto/updateCursoPlanDto';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get('curso')
  getCursoPlan() {
    return this.planService.getCursoPlan();
  }

  @Put('/curso/:id')
  updateDocente(
    // @Req() req: AuthenticatedRequest,
    @Param('id') id: number,
    @Body() updateCursoPlanDto: UpdateCursoPlanDto,
  ) {
    return this.planService.updateCursoPlan(id, updateCursoPlanDto);
  }
}
