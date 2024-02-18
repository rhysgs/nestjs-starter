import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { NestRequest } from 'src/common/types';
import { Reflector } from '@nestjs/core';
import { ViewType } from 'src/common/decorators';
import { AuthErrors } from './auth.errors';

@Injectable()
export class UnauthenticatedSessionAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const request: NestRequest = context.switchToHttp().getRequest();
    const viewType = this.reflector.get(ViewType, context.getHandler());

    if (viewType == null) {
      throw new AuthErrors.NoViewTypeError();
    }

    const sessionid = request.cookies.sessionid;

    if (sessionid != null) {
      throw new AuthErrors.InvalidSessionError(viewType, '/');
    }

    return true;
  }
}
