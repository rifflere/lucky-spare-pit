import { getDb } from '../db/db.js';

function normalizeTimestamp(value) {
  if (value === undefined || value === null) {
    return null;
  }
  return typeof value === 'string' ? value : new Date(value).toISOString();
}

export async function getAllInventory() {
  const db = getDb();
  const result = await db.query('SELECT * FROM inventory ORDER BY id ASC');
  return result.rows ?? [];
}

export async function findInventoryByName(name) {
  const db = getDb();
  const result = await db.query(
    'SELECT * FROM inventory WHERE name ILIKE $1 LIMIT 1',
    [name]
  );

  return result.rows[0] ?? null;
}

export async function updateInventoryItem(id, fields) {
  const db = getDb();
  const normalizedFields = {
    ...fields,
    lastUpdated: normalizeTimestamp(fields.lastUpdated)
  };

  const columns = Object.keys(normalizedFields);
  const setClauses = columns.map((key, index) => `${key} = $${index + 1}`).join(', ');
  const values = columns.map(key => normalizedFields[key]);

  const result = await db.query(
    `UPDATE inventory SET ${setClauses} WHERE id = $${columns.length + 1} RETURNING *`,
    [...values, id]
  );

  return result.rows[0];
}

export async function getDistinctSubteams() {
  const db = getDb();
  const result = await db.query(
    "SELECT DISTINCT checkOutBy FROM inventory WHERE checkOutBy <> '' AND checkOutBy IS NOT NULL ORDER BY checkOutBy ASC"
  );

  const values = result.rows.map(row => row.checkoutby || row.checkOutBy).filter(Boolean);
  return Array.from(new Set(values));
}

export async function insertInventoryItem(item) {
  const db = getDb();
  const insertPayload = {
    ...item,
    lastUpdated: normalizeTimestamp(item.lastUpdated)
  };
  const columns = Object.keys(insertPayload);
  const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');
  const values = columns.map(key => insertPayload[key]);

  const result = await db.query(
    `INSERT INTO inventory (${columns.join(', ')}) VALUES (${placeholders}) RETURNING *`,
    values
  );

  return result.rows[0];
}

export const findInventoryById = async (id) => {
  const db = getDb();
  const result = await db.query('SELECT * FROM inventory WHERE id = $1 LIMIT 1', [id]);
  return result.rows[0] ?? null;
};

export const deleteInventoryById = async (id) => {
  const db = getDb();
  await db.query('DELETE FROM inventory WHERE id = $1', [id]);
  return true;
};
