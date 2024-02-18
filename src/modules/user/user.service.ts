import { Injectable } from '@nestjs/common';
import { Db, InjectDb, NewUser, User, usersTable } from '../database';
import { eq } from 'drizzle-orm';
import { Uuid } from 'src/lib/uuid';
import { hash } from 'argon2';
import { UserErrors } from './user.errors';

@Injectable()
export class UserService {
  constructor(@InjectDb() private readonly db: Db<User>) {}

  private selectBase() {
    return this.db.select().from(usersTable);
  }

  async findById(id: Uuid): Promise<User> {
    const result = await this.selectBase()
      .where(eq(usersTable.id, id))
      .limit(1)
      .execute();

    if (!result.length) {
      throw new UserErrors.UserNotFoundError();
    }

    return result[0];
  }

  async findByEmail(email: string): Promise<User> {
    const result = await this.selectBase()
      .where(eq(usersTable.email, email))
      .limit(1)
      .execute();

    if (!result.length) {
      throw new UserErrors.UserNotFoundError();
    }

    return result[0];
  }

  async createUser(user: Omit<NewUser, 'id'>): Promise<User> {
    const id = new Uuid();
    await this.db
      .insert(usersTable)
      .values({
        id: id,
        email: user.email,
        password: await hash(user.password),
        firstName: user.firstName,
        lastName: user.lastName,
      })
      .execute();

    return this.findById(id);
  }
}
