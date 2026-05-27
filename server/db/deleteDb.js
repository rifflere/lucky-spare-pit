import { getDb } from './db.js';

export async function deleteDb() {
  const db = getDb();
  await db.query('DELETE FROM inventory WHERE id <> 0');
  console.log('Inventory table cleared.');
}
