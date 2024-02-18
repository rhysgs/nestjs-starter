import { fastifyStatic } from '@fastify/static';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { JTMXInterceptor } from './common/interceptors';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import fastifyRequestContext from '@fastify/request-context';
import { SessionEntity } from './modules/auth/auth.service';
import { SessionErrorFilter } from './modules/auth';

declare module '@fastify/request-context' {
  interface RequestContextData {
    session?: SessionEntity;
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // fastify plugins
  app.register(fastifyStatic, {
    root: join(join(__dirname, '..', 'public')),
    prefix: '/public/',
  });
  app.register(fastifyCookie, {});
  app.register(fastifyRequestContext, {});

  // interceptors
  app.useGlobalInterceptors(new JTMXInterceptor());

  // filters
  app.useGlobalFilters(new SessionErrorFilter());

  await app.listen(3000);
}

bootstrap();
