import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';
import { pgUuid } from './types';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export const usersTable = pgTable('users', {
  id: pgUuid()('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  password: varchar('password', { length: 1024 }).notNull(),
});

export const sessionsTable = pgTable('sessions', {
  id: pgUuid()('id').primaryKey(),
  userId: pgUuid()('user_id')
    .notNull()
    .references(() => usersTable.id),
  expiresAt: timestamp('expires_at', {
    mode: 'date',
  }).notNull(),
  createdAt: timestamp('created_at', {
    mode: 'date',
  }).notNull(),
});

export type User = InferSelectModel<typeof usersTable>;
export type NewUser = InferInsertModel<typeof usersTable>;

export type Session = InferSelectModel<typeof sessionsTable>;
export type NewSesion = InferInsertModel<typeof sessionsTable>;
