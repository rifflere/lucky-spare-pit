<<<<<<< HEAD
import { initDb } from '../db/initDb.js';

try {
  await initDb();
  console.log('Inventory access is configured correctly.');
} catch (err) {
  console.error('Failed to verify Supabase inventory configuration:', err.message);
  process.exit(1);
}
=======
import { initDb } from '../db/initDb.js';

await initDb();
>>>>>>> 796ac6e795cc3b6b27826a7901c7c0c2ce809c09
