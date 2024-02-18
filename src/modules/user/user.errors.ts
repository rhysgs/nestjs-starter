import { AppError } from 'src/common/errors';

export namespace UserErrors {
  export class UserNotFoundError extends AppError {}
}
