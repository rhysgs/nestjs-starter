import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { NestRequest, NestResponse } from 'src/common/types';
import { AuthService } from './auth.service';
import { Uuid } from 'src/lib/uuid';
import { Reflector } from '@nestjs/core';
import { ViewType } from 'src/common/decorators';
import { AuthErrors } from './auth.errors';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: NestRequest = context.switchToHttp().getRequest();
    const response: NestResponse = context.switchToHttp().getResponse();
    const viewType = this.reflector.get(ViewType, context.getHandler());

    if (viewType == null) {
      throw new AuthErrors.NoViewTypeError();
    }

    try {
      const sessionid = request.cookies.sessionid;

      if (!sessionid) {
        throw new AuthErrors.SessionNotFoundError();
      }

      let session = await this.authService.findSessionById(new Uuid(sessionid));

      if (this.authService.isSessionExpired(session)) {
        throw new AuthErrors.SessionExpiredError();
      }

      if (this.authService.shouldRefreshSession(session)) {
        session = await this.authService.refreshSession(session.id);

        response.setCookie('sessionid', session.id.toString(), {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          expires: session.expiresAt,
        });
      }

      request.requestContext.set('session', session);
    } catch (e) {
      throw new AuthErrors.InvalidSessionError(viewType);
    }

    return true;
  }
}
