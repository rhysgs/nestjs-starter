import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { NestResponse } from 'src/common/types';
import { AuthErrors } from './auth.errors';

@Catch(AuthErrors.InvalidSessionError)
export class SessionErrorFilter implements ExceptionFilter {
  catch(exception: AuthErrors.InvalidSessionError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<NestResponse>();
    const viewType = exception.getViewType();
    const location = exception.getLocation();

    if (viewType === 'partial') {
      response.status(HttpStatus.OK);
      response.header('hx-redirect', location);
      response.send();
    } else {
      response.redirect(HttpStatus.FOUND, location);
    }
  }
}
