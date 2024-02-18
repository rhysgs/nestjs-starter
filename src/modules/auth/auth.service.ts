import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user';
import { verify } from 'argon2';
import {
  Db,
  InjectDb,
  Session,
  User,
  sessionsTable,
  usersTable,
} from '../database';
import authConfig, { AuthConfig } from './auth.config';
import { Uuid } from 'src/lib/uuid';
import { and, eq, gt, lte, sql } from 'drizzle-orm';
import { Cron } from '@nestjs/schedule';
import { AuthErrors } from './auth.errors';

export type SessionEntity = Omit<Session, 'userId'> & {
  user: User;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectDb() private readonly db: Db<Session>,
    private readonly userService: UserService,
    @Inject(authConfig.KEY) private readonly config: AuthConfig,
  ) {}

  private sessionSelectBase() {
    return this.db
      .select({
        id: sessionsTable.id,
        user: usersTable,
        expiresAt: sessionsTable.expiresAt,
        createdAt: sessionsTable.createdAt,
      })
      .from(sessionsTable)
      .innerJoin(usersTable, eq(sessionsTable.userId, usersTable.id));
  }

  async findSessionById(id: Uuid): Promise<SessionEntity> {
    const result = await this.sessionSelectBase()
      .where(eq(sessionsTable.id, id))
      .limit(1)
      .execute();

    if (!result.length) {
      throw new AuthErrors.SessionNotFoundError();
    }

    return result[0];
  }

  async createSessionForUser(user: User): Promise<SessionEntity> {
    const now = new Date();
    const expires = new Date(now.valueOf() + this.config.SESSION_TTL * 1000);

    const id = new Uuid();
    await this.db
      .insert(sessionsTable)
      .values({
        id: id,
        userId: user.id,
        createdAt: now,
        expiresAt: expires,
      })
      .execute();

    return this.findSessionById(id);
  }

  async signIn(email: string, password: string): Promise<SessionEntity> {
    const user = await this.userService.findByEmail(email);

    const valid = await verify(user.password, password);

    if (!valid) {
      throw new UnauthorizedException();
    }

    const session = await this.createSessionForUser(user);

    return session;
  }

  isSessionExpired(session: SessionEntity) {
    const now = Date.now();

    return now.valueOf() > session.expiresAt.valueOf();
  }

  shouldRefreshSession(session: SessionEntity) {
    const now = Date.now();
    const remaining = Math.ceil((session.expiresAt.valueOf() - now) / 1000);

    return remaining < this.config.SESSION_REFRESH_TRESHOLD;
  }

  async refreshSession(id: Uuid) {
    const now = new Date();
    const expires = new Date(now.valueOf() + this.config.SESSION_TTL * 1000);

    const updateResult = await this.db
      .update(sessionsTable)
      .set({
        expiresAt: expires,
      })
      .where(
        and(eq(sessionsTable.id, id), gt(sessionsTable.expiresAt, sql`NOW()`)),
      )
      .execute();

    if (updateResult.count === 0) {
      throw new AuthErrors.SessionNotFoundError();
    }

    return this.findSessionById(id);
  }

  async deleteSession(id: Uuid) {
    const result = await this.db
      .delete(sessionsTable)
      .where(eq(sessionsTable.id, id))
      .execute();

    if (result.count === 0) {
      throw new AuthErrors.SessionNotFoundError();
    }
  }

  @Cron('0 * * * * *')
  async purgeExpiredSessions() {
    await this.db
      .delete(sessionsTable)
      .where(lte(sessionsTable.expiresAt, sql`NOW()`))
      .execute();
  }
}
