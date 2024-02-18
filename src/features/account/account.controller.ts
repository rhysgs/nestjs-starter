import {
  Controller,
  Get,
  HttpStatus,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { NestRequest, NestResponse } from 'src/common/types';
import { AuthService } from 'src/modules/auth/auth.service';
import { SessionAuthGuard } from 'src/modules/auth';
import { ViewType } from 'src/common/decorators';

@Controller()
@UseGuards(SessionAuthGuard)
export class AccountController {
  constructor(private readonly authService: AuthService) {}

  @Get('/logout')
  @ViewType('page')
  async postLogout(
    @Request() req: NestRequest,
    @Response({ passthrough: true }) res: NestResponse,
  ) {
    const session = req.requestContext.get('session');

    await this.authService.deleteSession(session.id);

    res.clearCookie('sessionid');

    res.redirect(HttpStatus.FOUND, '/login');
  }
}
