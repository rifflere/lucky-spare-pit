<<<<<<< HEAD
import { getDb } from '../db/db.js';

async function clearInventory() {
  const db = getDb();
  await db.query('DELETE FROM inventory WHERE id <> 0');
  console.log('All inventory rows deleted from the database.');
}

clearInventory().catch(err => {
  console.error('Error occurred while clearing Supabase inventory data:', err);
  process.exit(1);
});
=======
import { deleteDb } from '../db/deleteDb.js';

await deleteDb();
>>>>>>> 796ac6e795cc3b6b27826a7901c7c0c2ce809c09
