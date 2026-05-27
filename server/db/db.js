import dotenv from 'dotenv';
import pg from 'pg';

const { Pool } = pg;

dotenv.config();

let pool;

export function getDb() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;

    if (!connectionString) {
      throw new Error('Missing DATABASE_URL or SUPABASE_DB_URL in environment');
    }

    pool = new Pool({ connectionString });
  }

  return pool;
}
