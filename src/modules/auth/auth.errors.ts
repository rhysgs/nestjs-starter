import { ViewTypeArg } from 'src/common/decorators';
import { AppError } from 'src/common/errors';

export namespace AuthErrors {
  export class InvalidSessionError extends AppError {
    name = InvalidSessionError.name;

    constructor(
      private readonly viewType: ViewTypeArg,
      private readonly location?: string,
    ) {
      super();
    }

    getViewType() {
      return this.viewType;
    }

    getLocation() {
      return this.location ?? '/login';
    }
  }

  export class NoViewTypeError extends AppError {
    name = NoViewTypeError.name;
  }

  export class SessionError extends AppError {
    name = SessionError.name;
  }

  export class SessionNotFoundError extends SessionError {
    name = SessionNotFoundError.name;
  }

  export class SessionInvalidError extends SessionError {
    name = SessionInvalidError.name;
  }

  export class SessionExpiredError extends SessionError {
    name = SessionExpiredError.name;
  }

  export namespace UserErrors {
    export class UserNotFoundError extends AppError {}
  }
}
