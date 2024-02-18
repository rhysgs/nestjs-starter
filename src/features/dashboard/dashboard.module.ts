import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { AuthModule } from 'src/modules/auth';

@Module({
  imports: [AuthModule],
  controllers: [DashboardController],
})
export class DashboardModule {}
