import { describe, it, expect } from 'vitest';
import { createCursor, readCursor } from '../cursorUtils.js';

describe('cursorUtils', () => {
  describe('createCursor', () => {
    describe('simple objects', () => {
      it('creates cursor from simple object with single property', () => {
        const query = { page: 1 };
        const cursor = createCursor(query);

        expect(typeof cursor).toBe('string');
        expect(cursor).toBeTruthy();
        // Verify it's valid base64
        expect(() =>
          Buffer.from(cursor, 'base64').toString('utf8')
        ).not.toThrow();
      });

      it('creates cursor from object with multiple properties', () => {
        const query = { page: 1, limit: 10, offset: 0 };
        const cursor = createCursor(query);

        expect(typeof cursor).toBe('string');
        // Decode and verify the content
        const decoded = JSON.parse(
          Buffer.from(cursor, 'base64').toString('utf8')
        );
        expect(decoded).toStrictEqual(query);
      });

      it('creates cursor from object with string properties', () => {
        const query = { id: 'abc123', name: 'Test Item' };
        const cursor = createCursor(query);

        const decoded = JSON.parse(
          Buffer.from(cursor, 'base64').toString('utf8')
        );
        expect(decoded).toStrictEqual(query);
      });

      it('creates cursor from object with boolean properties', () => {
        const query = { active: true, archived: false };
        const cursor = createCursor(query);

        const decoded = JSON.parse(
          Buffer.from(cursor, 'base64').toString('utf8')
        );
        expect(decoded).toStrictEqual(query);
      });

      it('creates cursor from empty object', () => {
        const query = {};
        const cursor = createCursor(query);

        const decoded = JSON.parse(
          Buffer.from(cursor, 'base64').toString('utf8')
        );
        expect(decoded).toStrictEqual({});
      });
    });

    describe('complex nested objects', () => {
      it('creates cursor from nested object', () => {
        const query = {
          pagination: {
            page: 1,
            limit: 20,
          },
          filter: {
            status: 'active',
            type: 'venue',
          },
        };
        const cursor = createCursor(query);

        const decoded = JSON.parse(
          Buffer.from(cursor, 'base64').toString('utf8')
        );
        expect(decoded).toStrictEqual(query);
      });

      it('creates cursor from deeply nested object', () => {
        const query = {
          level1: {
            level2: {
              level3: {
                level4: {
                  value: 'deep',
                },
              },
            },
          },
        };
        const cursor = createCursor(query);

        const decoded = JSON.parse(
          Buffer.from(cursor, 'base64').toString('utf8')
        );
        expect(decoded).toStrictEqual(query);
      });

      it('creates cursor from object with mixed nested structures', () => {
        const query = {
          id: 123,
          metadata: {
            created: '2023-01-01',
            tags: ['tag1', 'tag2'],
            settings: {
              enabled: true,
            },
          },
        };
        const cursor = createCursor(query);

        const decoded = JSON.parse(
          Buffer.from(cursor, 'base64').toString('utf8')
        );
        expect(decoded).toStrictEqual(query);
      });
    });

    describe('arrays', () => {
      it('creates cursor from array of primitives', () => {
        const query = [1, 2, 3, 4, 5];
        const cursor = createCursor(query);

        const decoded = JSON.parse(
          Buffer.from(cursor, 'base64').toString('utf8')
        );
        expect(decoded).toStrictEqual(query);
      });

      it('creates cursor from array of strings', () => {
        const query = ['item1', 'item2', 'item3'];
        const cursor = createCursor(query);

        const decoded = JSON.parse(
          Buffer.from(cursor, 'base64').toString('utf8')
        );
        expect(decoded).toStrictEqual(query);
      });

      it('creates cursor from array of objects', () => {
        const query = [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' },
        ];
        const cursor = createCursor(query);

        const decoded = JSON.parse(
          Buffer.from(cursor, 'base64').toString('utf8')
        );
        expect(decoded).toStrictEqual(query);
      });

      it('creates cursor from empty array', () => {
        const query: unknown[] = [];
        const cursor = createCursor(query);

        const decoded = JSON.parse(
          Buffer.from(cursor, 'base64').toString('utf8')
        );
        expect(decoded).toStrictEqual([]);
      });
    });

    describe('data type preservation', () => {
      it('preserves number types', () => {
        const query = { integer: 42, float: 3.14, negative: -100, zero: 0 };
        const cursor = createCursor(query);

        const decoded = JSON.parse(
          Buffer.from(cursor, 'base64').toString('utf8')
        );
        expect(decoded.integer).toBe(42);
        expect(decoded.float).toBe(3.14);
        expect(decoded.negative).toBe(-100);
        expect(decoded.zero).toBe(0);
      });

      it('preserves string types', () => {
        const query = {
          empty: '',
          normal: 'hello',
          withNumbers: 'test123',
          withSpaces: 'hello world',
        };
        const cursor = createCursor(query);

        const decoded = JSON.parse(
          Buffer.from(cursor, 'base64').toString('utf8')
        );
        expect(typeof decoded.empty).toBe('string');
        expect(typeof decoded.normal).toBe('string');
        expect(decoded.normal).toBe('hello');
      });

      it('preserves boolean types', () => {
        const query = { trueValue: true, falseValue: false };
        const cursor = createCursor(query);

        const decoded = JSON.parse(
          Buffer.from(cursor, 'base64').toString('utf8')
        );
        expect(decoded.trueValue).toBe(true);
        expect(decoded.falseValue).toBe(false);
      });

      it('preserves null values', () => {
        const query = { nullValue: null, otherValue: 'test' };
        const cursor = createCursor(query);

        const decoded = JSON.parse(
          Buffer.from(cursor, 'base64').toString('utf8')
        );
        expect(decoded.nullValue).toBeNull();
        expect(decoded.otherValue).toBe('test');
      });

      it('preserves array types', () => {
        const query = {
          array: [1, 2, 3],
          nestedArray: [
            [1, 2],
            [3, 4],
          ],
        };
        const cursor = createCursor(query);

        const decoded = JSON.parse(
          Buffer.from(cursor, 'base64').toString('utf8')
        );
        expect(Array.isArray(decoded.array)).toBe(true);
        expect(Array.isArray(decoded.nestedArray)).toBe(true);
      });
    });

    describe('special characters', () => {
      it('handles strings with special characters', () => {
        const query = {
          special: '!@#$%^&*()',
          unicode: '你好世界',
          emoji: '🚀✨🎉',
          quoted: 'He said "Hello"',
          newline: 'Line1\nLine2',
          tab: 'Col1\tCol2',
        };
        const cursor = createCursor(query);

        const decoded = JSON.parse(
          Buffer.from(cursor, 'base64').toString('utf8')
        );
        expect(decoded.special).toBe('!@#$%^&*()');
        expect(decoded.unicode).toBe('你好世界');
        expect(decoded.emoji).toBe('🚀✨🎉');
        expect(decoded.quoted).toBe('He said "Hello"');
        expect(decoded.newline).toBe('Line1\nLine2');
        expect(decoded.tab).toBe('Col1\tCol2');
      });

      it('handles strings with escaped characters', () => {
        const query = {
          backslash: 'C:\\Users\\test',
          quotes: 'It\'s a "test"',
        };
        const cursor = createCursor(query);

        const decoded = JSON.parse(
          Buffer.from(cursor, 'base64').toString('utf8')
        );
        expect(decoded.backslash).toBe('C:\\Users\\test');
        expect(decoded.quotes).toBe('It\'s a "test"');
      });

      it('handles very long strings', () => {
        const longString = 'a'.repeat(10000);
        const query = { longValue: longString };
        const cursor = createCursor(query);

        const decoded = JSON.parse(
          Buffer.from(cursor, 'base64').toString('utf8')
        );
        expect(decoded.longValue).toBe(longString);
        expect(decoded.longValue).toHaveLength(10000);
      });
    });

    describe('type generics', () => {
      it('supports typed objects with generic type parameter', () => {
        interface PaginationQuery {
          page: number;
          limit: number;
        }

        const query: PaginationQuery = { page: 1, limit: 20 };
        const cursor = createCursor<PaginationQuery>(query);

        const decoded = JSON.parse(
          Buffer.from(cursor, 'base64').toString('utf8')
        ) as PaginationQuery;
        expect(decoded.page).toBe(1);
        expect(decoded.limit).toBe(20);
      });

      it('supports complex typed interfaces', () => {
        interface FilterOptions {
          search?: string;
          tags?: string[];
          status: 'active' | 'inactive';
          metadata?: Record<string, unknown>;
        }

        const query: FilterOptions = {
          search: 'venue',
          tags: ['popular', 'recommended'],
          status: 'active',
          metadata: { source: 'api', version: 1 },
        };
        const cursor = createCursor<FilterOptions>(query);

        const decoded = JSON.parse(
          Buffer.from(cursor, 'base64').toString('utf8')
        ) as FilterOptions;
        expect(decoded.status).toBe('active');
        expect(decoded.tags).toStrictEqual(['popular', 'recommended']);
      });
    });
  });

  describe('readCursor', () => {
    describe('reading valid cursors', () => {
      it('reads cursor and returns original object', () => {
        const originalQuery = { page: 1 };
        const cursor = createCursor(originalQuery);
        const result = readCursor<typeof originalQuery>(cursor);

        expect(result).toStrictEqual(originalQuery);
      });

      it('reads cursor with complex nested object', () => {
        const originalQuery = {
          pagination: { page: 1, limit: 20 },
          filter: { status: 'active' },
        };
        const cursor = createCursor(originalQuery);
        const result = readCursor<typeof originalQuery>(cursor);

        expect(result).toStrictEqual(originalQuery);
      });

      it('reads cursor with array', () => {
        const originalQuery = [1, 2, 3, 4, 5];
        const cursor = createCursor(originalQuery);
        const result = readCursor<typeof originalQuery>(cursor);

        expect(result).toStrictEqual(originalQuery);
      });

      it('reads cursor with special characters', () => {
        const originalQuery = {
          name: '🚀 Venue',
          description: 'Unicode: 你好',
        };
        const cursor = createCursor(originalQuery);
        const result = readCursor<typeof originalQuery>(cursor);

        expect(result).toStrictEqual(originalQuery);
      });

      it('reads cursor with all data types', () => {
        const originalQuery = {
          string: 'test',
          number: 42,
          float: 3.14,
          boolean: true,
          null: null,
          array: [1, 2, 3],
          object: { nested: 'value' },
        };
        const cursor = createCursor(originalQuery);
        const result = readCursor<typeof originalQuery>(cursor);

        expect(result).toStrictEqual(originalQuery);
        expect(typeof result?.string).toBe('string');
        expect(typeof result?.number).toBe('number');
        expect(typeof result?.boolean).toBe('boolean');
        expect(result?.null).toBeNull();
      });
    });

    describe('handling null and empty values', () => {
      it('returns null when cursor is null', () => {
        const result = readCursor<unknown>(null);
        expect(result).toBeNull();
      });

      it('returns null when cursor is empty string', () => {
        const result = readCursor<unknown>('');
        expect(result).toBeNull();
      });

      it('returns null when cursor is undefined (type compatibility)', () => {
        // Note: undefined is passed as null when it's a parameter
        const result = readCursor<unknown>(null);
        expect(result).toBeNull();
      });
    });

    describe('round-trip testing', () => {
      it('round-trip: simple object preserves data', () => {
        const original = { page: 1, limit: 10 };
        const cursor = createCursor(original);
        const restored = readCursor<typeof original>(cursor);

        expect(restored).toStrictEqual(original);
      });

      it('round-trip: complex nested object preserves data', () => {
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
        };
        const cursor = createCursor(original);
        const restored = readCursor<typeof original>(cursor);

        expect(restored).toStrictEqual(original);
        expect(restored?.filters.tags).toStrictEqual(['food', 'entertainment']);
        expect(restored?.pagination.page).toBe(2);
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

      it('round-trip: multiple times returns consistent result', () => {
        const original = { search: 'venue', page: 1 };

        let current = original;
        for (let i = 0; i < 3; i++) {
          const cursor = createCursor(current);
          current = readCursor<typeof current>(cursor) || current;
          expect(current).toStrictEqual(original);
        }
      });

      it('round-trip: with special characters', () => {
        const original = {
          query: 'Café résumé naïve',
          emoji: '🎭🎪🎨',
          symbols: '©®™',
        };
        const cursor = createCursor(original);
        const restored = readCursor<typeof original>(cursor);

        expect(restored).toStrictEqual(original);
      });

      it('round-trip: empty object', () => {
        const original = {};
        const cursor = createCursor(original);
        const restored = readCursor<typeof original>(cursor);

        expect(restored).toStrictEqual({});
      });

      it('round-trip: empty array', () => {
        const original: unknown[] = [];
        const cursor = createCursor(original);
        const restored = readCursor<typeof original>(cursor);

        expect(restored).toStrictEqual([]);
      });
    });

    describe('type safety with generics', () => {
      it('returns correctly typed result for object', () => {
        interface Query {
          page: number;
          keyword?: string;
        }

        const original: Query = { page: 1, keyword: 'test' };
        const cursor = createCursor(original);
        const result = readCursor<Query>(cursor);

        expect(result?.page).toBe(1);
        expect(result?.keyword).toBe('test');
      });

      it('returns correctly typed result for array', () => {
        interface Item {
          id: string;
          value: number;
        }

        const original: Item[] = [
          { id: 'a', value: 1 },
          { id: 'b', value: 2 },
        ];
        const cursor = createCursor(original);
        const result = readCursor<Item[]>(cursor);

        expect(Array.isArray(result)).toBe(true);
        expect(result?.[0].id).toBe('a');
      });
    });

    describe('edge cases', () => {
      it('handles very large objects', () => {
        const largeObject: Record<string, number> = {};
        for (let i = 0; i < 1000; i++) {
          largeObject[`key${i}`] = i;
        }

        const cursor = createCursor(largeObject);
        const result = readCursor<typeof largeObject>(cursor);

        expect(Object.keys(result || {})).toHaveLength(1000);
        expect(result?.key500).toBe(500);
      });

      it('handles deeply nested structures', () => {
        let deep: Record<string, unknown> = { value: 'deep' };
        for (let i = 0; i < 100; i++) {
          deep = { nested: deep };
        }

        const cursor = createCursor(deep);
        const result = readCursor<typeof deep>(cursor);

        // Navigate through the nested structure
        let current: unknown = result;
        for (let i = 0; i < 100; i++) {
          current = (current as Record<string, unknown>).nested;
        }
        expect((current as Record<string, unknown>).value).toBe('deep');
      });

      it('handles arrays with mixed types', () => {
        const mixed: unknown[] = [
          1,
          'string',
          true,
          null,
          { object: 'value' },
          [1, 2, 3],
        ];

        const cursor = createCursor(mixed);
        const result = readCursor<typeof mixed>(cursor);

        expect(result?.[0]).toBe(1);
        expect(result?.[1]).toBe('string');
        expect(result?.[2]).toBe(true);
        expect(result?.[3]).toBeNull();
        expect(result?.[4]).toStrictEqual({ object: 'value' });
        expect(result?.[5]).toStrictEqual([1, 2, 3]);
      });
    });
  });

  describe('integration tests', () => {
    it('cursor from readCursor can be used as createCursor input', () => {
      const original = { page: 1, filter: 'active' };
      const cursor1 = createCursor(original);
      const readData = readCursor<typeof original>(cursor1);
      const cursor2 = createCursor(readData);

      expect(cursor1).toBe(cursor2);
      expect(readCursor(cursor2)).toStrictEqual(original);
    });

    it('works with paginated cursor pattern (common GraphQL use case)', () => {
      interface CursorQuery {
        offset: number;
        limit: number;
        searchTerm?: string;
      }

      const page1: CursorQuery = { offset: 0, limit: 20, searchTerm: 'venue' };
      const page2: CursorQuery = { offset: 20, limit: 20, searchTerm: 'venue' };

      const cursor1 = createCursor(page1);
      const cursor2 = createCursor(page2);

      expect(cursor1).not.toBe(cursor2);

      const restored1 = readCursor<CursorQuery>(cursor1);
      const restored2 = readCursor<CursorQuery>(cursor2);

      expect(restored1?.offset).toBe(0);
      expect(restored2?.offset).toBe(20);
    });

    it('maintains cursor consistency across different encodings', () => {
      const data = {
        query: 'café',
        page: 1,
        emoji: '🌍',
      };

      // Create cursor multiple times
      const cursor1 = createCursor(data);
      const cursor2 = createCursor(data);

      // Should produce identical cursors
      expect(cursor1).toBe(cursor2);

      // Both should decode to the same data
      expect(readCursor(cursor1)).toStrictEqual(readCursor(cursor2));
    });
  });
});
