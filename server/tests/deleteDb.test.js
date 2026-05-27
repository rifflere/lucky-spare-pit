import { jest } from '@jest/globals';

const mockQuery = jest.fn();
const mockGetDb = jest.fn().mockReturnValue({ query: mockQuery });

await jest.unstable_mockModule('../db/db.js', () => ({
  getDb: mockGetDb,
}));

const { deleteDb } = await import('../db/deleteDb.js');

afterEach(() => {
  jest.clearAllMocks();
});

test('deleteDb clears the Supabase inventory table', async () => {
  mockQuery.mockResolvedValue({});

  await expect(deleteDb()).resolves.toBeUndefined();
  expect(mockGetDb).toHaveBeenCalled();
  expect(mockQuery).toHaveBeenCalledWith('DELETE FROM inventory WHERE id <> 0');
});

test('deleteDb throws when delete fails', async () => {
  mockQuery.mockRejectedValueOnce(new Error('delete failed'));

  await expect(deleteDb()).rejects.toThrow(/delete failed/i);
});
