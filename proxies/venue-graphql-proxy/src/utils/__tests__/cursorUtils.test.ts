import { describe, it, expect } from 'vitest';
import { createCursor, readCursor } from '../cursorUtils.js';

describe('cursorUtils', () => {
  it('creates and reads back a basic object', () => {
    const query = { page: 1, limit: 10 };
    const cursor = createCursor(query);

    expect(typeof cursor).toBe('string');
    expect(cursor).toBeTruthy();

    const result = readCursor<typeof query>(cursor);
    expect(result).toStrictEqual(query);
  });

  it('round-trip: complex nested object with mixed types', () => {
    const original = {
      filters: {
        tags: ['food', 'entertainment'],
        distance: 5,
        openNow: true,
      },
      pagination: {
        page: 2,
        pageSize: 50,
      },
      sort: {
        field: 'rating',
        order: 'desc' as const,
      },
      search: null,
    };

    const cursor = createCursor(original);
    const restored = readCursor<typeof original>(cursor);

    expect(restored).toStrictEqual(original);
    expect(restored?.filters.tags).toStrictEqual(['food', 'entertainment']);
    expect(restored?.pagination.page).toBe(2);
    expect(restored?.search).toBeNull();
  });

  it('returns null when cursor is null (falsy branch)', () => {
    const result = readCursor<unknown>(null);
    expect(result).toBeNull();
  });

  it('returns null when cursor is empty string (falsy branch)', () => {
    const result = readCursor<unknown>('');
    expect(result).toBeNull();
  });

  it('round-trip: array preserves data and order', () => {
    const original = [
      { id: 1, name: 'First' },
      { id: 2, name: 'Second' },
      { id: 3, name: 'Third' },
    ];

    const cursor = createCursor(original);
    const restored = readCursor<typeof original>(cursor);

    expect(restored).toStrictEqual(original);
    expect(restored?.[0].name).toBe('First');
    expect(restored?.[2].name).toBe('Third');
  });

  it('round-trip: handles special characters and Unicode', () => {
    const original = {
      name: '🚀 Venue',
      description: 'Unicode: 你好',
      query: 'Café résumé',
      symbols: '©®™',
    };

    const cursor = createCursor(original);
    const restored = readCursor<typeof original>(cursor);

    expect(restored).toStrictEqual(original);
  });
});
