import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JTMXResult } from 'src/lib/jtmx';
import { NestResponse } from '../types';

@Injectable()
export class JTMXInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const response: NestResponse = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        if (data instanceof JTMXResult) {
          response.header('Content-Type', 'text/html');

          return data.toString();
        }

        return data;
      }),
    );
  }
}
