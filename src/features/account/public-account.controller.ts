import {
  Body,
  Controller,
  Get,
  Post,
  Response,
  UseGuards,
} from '@nestjs/common';
import { RegistrationFormComponent } from './components/registration-form.component';
import { NestResponse } from 'src/common/types';
import { RegisterPageComponent } from './components/register-page.component';
import { LoginPageComponent } from './components/login-page.component';
import { RegistrationFormSchema } from './schemas/registration-form.schema';
import { LoginFormComponent } from './components/login-form.component';
import { LoginFormSchema } from './schemas/login-form.schema';
import { AuthService } from 'src/modules/auth/auth.service';
import { UnauthenticatedSessionAuthGuard } from 'src/modules/auth';
import { ViewType } from 'src/common/decorators';
import { AccountService } from './account.service';

@Controller()
@UseGuards(UnauthenticatedSessionAuthGuard)
export class PublicAccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthService,
  ) {}

  @Get('/register')
  @ViewType('page')
  getRegister() {
    return RegisterPageComponent({});
  }

  @Post('/register')
  @ViewType('partial')
  async postRegister(
    @Body() body,
    @Response({ passthrough: true }) res: NestResponse,
  ) {
    const parsedBody = RegistrationFormSchema.safeParse(body);

    if (parsedBody.success === false) {
      const fieldErrors = parsedBody.error.formErrors.fieldErrors;

      return RegistrationFormComponent({
        values: {
          email: body.email,
          password: body.password,
          firstName: body.firstName,
          lastName: body.lastName,
        },
        fieldErrors: fieldErrors,
      });
    }

    try {
      await this.accountService.registerUser(parsedBody.data);
    } catch (e) {
      return RegistrationFormComponent({
        values: {
          email: parsedBody.data.email,
          firstName: parsedBody.data.firstName,
          lastName: parsedBody.data.lastName,
        },
        error: 'There was an issue with your registration.',
      });
    }

    res.header('hx-redirect', '/login');
  }

  @Get('/login')
  @ViewType('page')
  getLogin() {
    return LoginPageComponent({});
  }

  @Post('/login')
  @ViewType('partial')
  async postLogin(
    @Body() body: LoginFormSchema,
    @Response({ passthrough: true }) res: NestResponse,
  ) {
    const parsedBody = LoginFormSchema.safeParse(body);

    if (parsedBody.success === false) {
      const fieldErrors = parsedBody.error.formErrors.fieldErrors;

      return LoginFormComponent({
        values: {
          email: body.email,
          password: body.password,
        },
        fieldErrors: fieldErrors,
      });
    }

    try {
      const session = await this.authService.signIn(
        parsedBody.data.email,
        parsedBody.data.password,
      );

      res.setCookie('sessionid', session.id.toString(), {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: session.expiresAt,
      });
      res.header('hx-redirect', '/');
    } catch (e) {
      return LoginFormComponent({
        values: {
          email: body.email,
        },
        error: 'Email or password incorrect.',
      });
    }
  }
}
