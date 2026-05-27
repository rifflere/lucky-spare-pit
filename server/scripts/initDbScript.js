import { initDb } from '../db/initDb.js';

try {
  await initDb();
  console.log('Inventory access is configured correctly.');
} catch (err) {
  console.error('Failed to verify Supabase inventory configuration:', err.message);
  process.exit(1);
}