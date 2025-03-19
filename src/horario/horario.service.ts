import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHorarioDto } from './dto/createHorarioDto';

@Injectable()
export class HorarioService {
  constructor(private readonly prismaService: PrismaService) {}

  async createHorario(createHorarioDto: CreateHorarioDto) {
    console.log('createHorarioDto', createHorarioDto);

    return createHorarioDto;
  }
}
