import postgres from 'postgres';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import {
  Inject,
  Logger,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig, { DatabaseConfig } from './database.config';
import { AppError } from 'src/common/errors';

export const DRIZZLE_INSTANCE = 'DRIZZLE_INSTANCE';
export const POSTGRES_CLIENT = 'POSTGRES_CLIENT';

export const InjectDb = () => {
  return Inject(DRIZZLE_INSTANCE);
};

const InjectPostgresPool = () => {
  return Inject(POSTGRES_CLIENT);
};

export type Db<TRecord> = PostgresJsDatabase<Record<string, TRecord>>;

@Module({
  imports: [ConfigModule.forRoot({ load: [databaseConfig] })],
  providers: [
    {
      provide: POSTGRES_CLIENT,
      inject: [databaseConfig.KEY],
      useFactory: async (config: DatabaseConfig): Promise<postgres.Sql> => {
        return postgres({
          database: config.DB_NAME,
          user: config.DB_USER,
          password: config.DB_PASSWORD,
          host: config.DB_HOST,
          port: config.DB_PORT,
          max: config.DB_POOL_SIZE,
          ssl: undefined,
          onnotice: () => void 0,
        });
      },
    },
    {
      provide: DRIZZLE_INSTANCE,
      inject: [POSTGRES_CLIENT],
      useFactory: async (
        databaseConnection: postgres.Sql,
      ): Promise<PostgresJsDatabase<Record<string, unknown>>> => {
        return drizzle(databaseConnection);
      },
    },
  ],
  exports: [DRIZZLE_INSTANCE],
})
export class DatabaseModule
  implements OnModuleInit, OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger(DatabaseModule.name);

  constructor(
    @InjectDb() private readonly db: Db<unknown>,
    @InjectPostgresPool() private readonly postgres: postgres.Sql,
  ) {}

  async onApplicationShutdown() {
    if (this.postgres != null) {
      await this.postgres.end();
    }
  }

  /**
   * Verify we can connect to the database as part of the application init phase
   */
  async onModuleInit() {
    try {
      await this.postgres`SELECT version()`;
    } catch (e) {
      throw new AppError('Failed to initialise the database');
    }
  }

  async onApplicationBootstrap() {
    await migrate(this.db, { migrationsFolder: 'drizzle' });

    this.logger.log('Database migrations executed');
  }
}
