<<<<<<< HEAD
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
=======
// Primary database connection — PostgreSQL via the Supabase Transaction Pooler.
// Uses the pg driver with a single shared Pool, lazily created on first call.
// To run locally without Supabase, see db.sqlite.js and README → "Local SQLite Development".
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;
let pool;

export function getDb() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      const err = new Error(
        'Missing required environment variable: DATABASE_URL must be set. ' +
        'Copy server/.env.example to server/.env and fill in your Supabase Transaction Pooler connection string. ' +
        'Find it at: Supabase dashboard → Settings → Database → Connection string → Transaction pooler. ' +
        'To run locally without Supabase, see README → "Local SQLite Development".'
      );
      err.code = 'MISSING_DB_CONFIG';
      throw err;
    }

    pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
  }

  return pool;
}
>>>>>>> 796ac6e795cc3b6b27826a7901c7c0c2ce809c09
