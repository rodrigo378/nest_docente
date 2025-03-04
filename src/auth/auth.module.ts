import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StrategyService } from './strategy.service';

@Module({
  providers: [AuthService, StrategyService],
  controllers: [AuthController],
})
export class AuthModule {}
