<<<<<<< HEAD
import { getDb } from './db.js';

export async function deleteDb() {
  const db = getDb();
  await db.query('DELETE FROM inventory WHERE id <> 0');
  console.log('Inventory table cleared.');
}
=======
import { getDb } from './db.js';

// Deletes all rows from the Supabase inventory table (the schema itself is preserved).
// Intended for testing and development resets — use with caution in production.
export async function deleteDb() {
  const db = getDb();
  await db.query('DELETE FROM inventory');
  console.log('Supabase inventory table cleared.');
}
>>>>>>> 796ac6e795cc3b6b27826a7901c7c0c2ce809c09
