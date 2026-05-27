import { jest } from '@jest/globals';

const mockQuery = jest.fn();
const mockGetDb = jest.fn().mockReturnValue({ query: mockQuery });

await jest.unstable_mockModule('../db/db.js', () => ({
  getDb: mockGetDb,
}));

const { initDb } = await import('../db/initDb.js');

afterEach(() => {
  jest.clearAllMocks();
});

test('initDb validates Supabase inventory table access', async () => {
  mockQuery.mockResolvedValue({ rows: [{ '?column?' : 1 }], command: 'SELECT' });

  await expect(initDb()).resolves.toBeDefined();
  expect(mockGetDb).toHaveBeenCalled();
  expect(mockQuery).toHaveBeenCalledWith('SELECT 1 FROM inventory LIMIT 1');
});

test('initDb throws a descriptive error when table is unavailable', async () => {
  mockQuery.mockRejectedValueOnce(new Error('relation "inventory" does not exist'));

  await expect(initDb()).rejects.toThrow(/Supabase inventory table is unavailable/i);
});
