import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user';
import { ConfigModule } from '@nestjs/config';
import authConfig from './auth.config';
import { DatabaseModule } from '../database';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ load: [authConfig] }),
    DatabaseModule,
    UserModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
