import { Module } from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { ComentarioController } from './comentario.controller';

@Module({
  providers: [ComentarioService],
  controllers: [ComentarioController]
})
export class ComentarioModule {}
