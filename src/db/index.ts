import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool, PoolConfig } from 'pg';
import {
  Connector,
  AuthTypes,
  IpAddressTypes
} from '@google-cloud/cloud-sql-connector';
import { logger } from '@/lib/logger';

const isLocalhost =
  process.env.NODE_ENV === 'development' || process.env.USE_LOCAL_DB === 'true';

let poolInstance: Pool | null = null;
let dbInstance: ReturnType<typeof drizzle> | null = null;
let initPromise: Promise<ReturnType<typeof drizzle>> | null = null;

async function getDb(): Promise<ReturnType<typeof drizzle>> {
  if (dbInstance) {
    return dbInstance;
  }

  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      let poolOptions: PoolConfig;

      if (isLocalhost) {
        const connectionString = process.env.DATABASE_URL;
        if (!connectionString) {
          throw new Error('DATABASE_URL is not set');
        }

        poolOptions = {
          connectionString,
          max: 5,
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 2000
        };
        poolInstance = new Pool(poolOptions);
      } else {
        const instanceConnectionName = process.env.INSTANCE_CONNECTION_NAME;
        const dbUser = process.env.DB_USER;
        const dbName = process.env.DB_NAME;

        if (!instanceConnectionName) {
          throw new Error('INSTANCE_CONNECTION_NAME is not set');
        }
        if (!dbUser) {
          throw new Error('DB_USER is not set');
        }
        if (!dbName) {
          throw new Error('DB_NAME is not set');
        }

        const connector = new Connector();

        const clientOpts = await connector.getOptions({
          instanceConnectionName,
          ipType: IpAddressTypes.PUBLIC,
          authType: AuthTypes.IAM
        });

        poolOptions = {
          ...clientOpts,
          user: dbUser,
          database: dbName,
          max: 5,
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 2000,
          ssl: false
        };

        poolInstance = new Pool(poolOptions);

        poolInstance.on('error', (err) => {
          logger('[DB] Pool error:', err);
        });

        poolInstance.on('connect', () => {
          logger('[DB] New client connected to pool');
        });
      }

      dbInstance = drizzle({ client: poolInstance });

      return dbInstance;
    } catch (error) {
      logger('[DB] Error during database initialization:', error);
      if (error instanceof Error) {
        logger('[DB] Error message:', error.message);
        logger('[DB] Error stack:', error.stack);
      }
      throw error;
    }
  })();

  return initPromise;
}

export default getDb;
export { getDb };
