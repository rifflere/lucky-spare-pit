import { getAllInventory, findInventoryByName, insertInventoryItem, getDistinctSubteams, findInventoryById, updateInventoryItem, deleteInventoryById } from '../models/inventoryModel.js';

const patchableColumns = [
  'name', 'type', 'area', 'location', 'status',
  'quantity', 'condition', 'itemImage', 'checkOutBy', 'tags', 'notes'
];

export { patchableColumns };

export async function getAllInventoryService() {
  return getAllInventory();
}

export async function patchInventoryService(id, updates) {
  const existing = await findInventoryById(id);
  if (!existing) {
    const err = new Error(`Inventory item with ID ${id} not found`);
    err.status = 404;
    throw err;
  }
  return updateInventoryItem(id, { ...updates, lastUpdated: Date.now() });
}

export async function getSubteamsService() {
  return getDistinctSubteams();
}

export async function postInventoryService(item) {
  const possibleDuplicate = await findInventoryByName(item.name);
  const newItem = await insertInventoryItem({ ...item, lastUpdated: Date.now() });

  return { ...newItem, possibleDuplicate: possibleDuplicate ? possibleDuplicate : null };
}

export const deleteInventoryService = async (id) => {
  const inventory = await findInventoryById(id);

  if (!inventory) {
    throw new Error('Inventory item not found');
  }

  await deleteInventoryById(id);
  return inventory;
};