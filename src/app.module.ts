import { Module } from '@nestjs/common';
import { AccountModule } from './features/account';
import { DashboardModule } from './features/dashboard';

@Module({
  imports: [DashboardModule, AccountModule],
})
export class AppModule {}
