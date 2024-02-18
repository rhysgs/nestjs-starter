import { Injectable } from '@nestjs/common';
import { RegistrationFormSchema } from './schemas/registration-form.schema';
import { UserService } from 'src/modules/user';

@Injectable()
export class AccountService {
  constructor(private readonly userService: UserService) {}

  async registerUser(data: RegistrationFormSchema): Promise<void> {
    await this.userService.createUser({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    });
  }
}
