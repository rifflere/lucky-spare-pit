import { getDb } from './db.js';

export async function initDb() {
  const db = getDb();

  try {
    await db.query('SELECT 1 FROM inventory LIMIT 1');
  } catch (error) {
    console.error('Unable to verify inventory table:', error.message);
    throw new Error('Supabase inventory table is unavailable. Create the table in Supabase or run your migration.');
  }

  console.log('Inventory table verified.');
  return db;
}
