import { Controller, Get, UseGuards } from '@nestjs/common';
import { ViewType } from 'src/common/decorators';
import { DashboardPageComponent } from './components/dashboard-page.component';
import { SessionAuthGuard } from 'src/modules/auth';

@Controller()
export class DashboardController {
  constructor() {}

  @Get('/')
  @ViewType('page')
  @UseGuards(SessionAuthGuard)
  getDashboard() {
    return DashboardPageComponent({});
  }
}
