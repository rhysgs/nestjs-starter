import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { DatabaseModule } from 'src/modules/database';
import { UserModule } from 'src/modules/user';
import { AuthModule } from 'src/modules/auth';
import { PublicAccountController } from './public-account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
  controllers: [AccountController, PublicAccountController],
  providers: [AccountService],
})
export class AccountModule {}
