import { describe, it, expect } from 'vitest';
import mapKeysToCamelCase from '../map-keys-to-camel-case.js';

describe('mapKeysToCamelCase', () => {
  describe('Simple snake_case keys', () => {
    it('converts simple snake_case keys to camelCase', () => {
      const input = { first_name: 'John', last_name: 'Doe' };
      const result = mapKeysToCamelCase(input);

      expect(result).toStrictEqual({
        firstName: 'John',
        lastName: 'Doe',
      });
    });

    it('converts multiple underscores to camelCase', () => {
      const input = { first_middle_last_name: 'John Michael Doe' };
      const result = mapKeysToCamelCase(input);

      expect(result).toStrictEqual({
        firstMiddleLastName: 'John Michael Doe',
      });
    });

    it('preserves single word keys without underscores', () => {
      const input = { name: 'John', age: 30 };
      const result = mapKeysToCamelCase(input);

      expect(result).toStrictEqual({
        name: 'John',
        age: 30,
      });
    });
  });

  describe('Nested objects', () => {
    it('converts top-level keys but does not recursively transform nested object keys', () => {
      const input = {
        user_info: {
          first_name: 'John',
          last_name: 'Doe',
        },
      };
      const result = mapKeysToCamelCase(input);

      // Only top-level keys are transformed
      expect(result).toStrictEqual({
        userInfo: {
          first_name: 'John',
          last_name: 'Doe',
        },
      });
    });

    it('preserves nested objects unchanged (no recursive transformation)', () => {
      const input = {
        user_profile: {
          contact_info: {
            home_address: {
              street_name: '123 Main St',
              zip_code: '12345',
            },
          },
        },
      };
      const result = mapKeysToCamelCase(input);

      // Only the outermost key gets transformed
      expect(result).toStrictEqual({
        userProfile: {
          contact_info: {
            home_address: {
              street_name: '123 Main St',
              zip_code: '12345',
            },
          },
        },
      });
    });

    it('handles nested objects with snake_case keys at all levels', () => {
      const input = {
        outer_level: {
          inner_level: {
            deep_value: 'test',
          },
        },
      };
      const result = mapKeysToCamelCase(input);

      // Only transforms top-level key
      expect(result).toStrictEqual({
        outerLevel: {
          inner_level: {
            deep_value: 'test',
          },
        },
      });
    });
  });

  describe('Mixed keys', () => {
    it('handles mixed snake_case and already camelCase keys', () => {
      const input = {
        first_name: 'John',
        lastName: 'Doe',
        middle_name: 'Michael',
      };
      const result = mapKeysToCamelCase(input);

      expect(result).toStrictEqual({
        firstName: 'John',
        lastName: 'Doe',
        middleName: 'Michael',
      });
    });

    it('converts all caps with underscores to camelCase', () => {
      const input = {
        USER_ID: '123',
        IS_ACTIVE: true,
        CREATED_AT: '2023-01-01',
      };
      const result = mapKeysToCamelCase(input);

      expect(result).toStrictEqual({
        userId: '123',
        isActive: true,
        createdAt: '2023-01-01',
      });
    });
  });

  describe('Empty objects', () => {
    it('returns empty object for empty input', () => {
      const input = {};
      const result = mapKeysToCamelCase(input);

      expect(result).toStrictEqual({});
    });

    it('preserves empty nested objects but converts parent keys', () => {
      const input = {
        outer_level: {
          inner_level: {},
        },
      };
      const result = mapKeysToCamelCase(input);

      expect(result).toStrictEqual({
        outerLevel: {
          inner_level: {},
        },
      });
    });
  });

  describe('Value preservation', () => {
    it('preserves numeric values', () => {
      const input = {
        user_id: 123,
        age: 30,
        price: 99.99,
        count: -5,
      };
      const result = mapKeysToCamelCase(input);

      expect(result).toStrictEqual({
        userId: 123,
        age: 30,
        price: 99.99,
        count: -5,
      });
    });

    it('preserves boolean values', () => {
      const input = {
        is_active: true,
        is_deleted: false,
      };
      const result = mapKeysToCamelCase(input);

      expect(result).toStrictEqual({
        isActive: true,
        isDeleted: false,
      });
    });

    it('preserves null values', () => {
      const input = {
        user_name: 'John',
        optional_field: null,
      };
      const result = mapKeysToCamelCase(input);

      expect(result).toStrictEqual({
        userName: 'John',
        optionalField: null,
      });
    });

    it('preserves string values', () => {
      const input = {
        first_name: 'John',
        last_name: 'Doe',
        email_address: 'john@example.com',
      };
      const result = mapKeysToCamelCase(input);

      expect(result).toStrictEqual({
        firstName: 'John',
        lastName: 'Doe',
        emailAddress: 'john@example.com',
      });
    });
  });

  describe('Array handling', () => {
    it('preserves arrays as-is without modifying array elements', () => {
      const input = {
        user_names: ['John', 'Jane', 'Bob'],
        user_ids: [1, 2, 3],
      };
      const result = mapKeysToCamelCase(input);

      expect(result).toStrictEqual({
        userNames: ['John', 'Jane', 'Bob'],
        userIds: [1, 2, 3],
      });
    });

    it('does not recursively process array elements', () => {
      const input = {
        items_list: [
          { first_name: 'John', last_name: 'Doe' },
          { first_name: 'Jane', last_name: 'Smith' },
        ],
      };
      const result = mapKeysToCamelCase(input);

      // Arrays are preserved as-is, not recursively transformed
      expect(result).toStrictEqual({
        itemsList: [
          { first_name: 'John', last_name: 'Doe' },
          { first_name: 'Jane', last_name: 'Smith' },
        ],
      });
    });

    it('preserves nested arrays of objects', () => {
      const input = {
        user_records: [
          {
            item_id: 1,
            item_name: 'Item 1',
          },
          {
            item_id: 2,
            item_name: 'Item 2',
          },
        ],
      };
      const result = mapKeysToCamelCase(input);

      expect(result).toStrictEqual({
        userRecords: [
          {
            item_id: 1,
            item_name: 'Item 1',
          },
          {
            item_id: 2,
            item_name: 'Item 2',
          },
        ],
      });
    });

    it('preserves empty arrays', () => {
      const input = {
        user_list: [],
        comment_ids: [],
      };
      const result = mapKeysToCamelCase(input);

      expect(result).toStrictEqual({
        userList: [],
        commentIds: [],
      });
    });
  });

  describe('Edge cases with underscores', () => {
    it('handles leading underscores', () => {
      const input = {
        _private_key: 'secret',
        _internal_id: 123,
      };
      const result = mapKeysToCamelCase(input);

      expect(result).toStrictEqual({
        privateKey: 'secret',
        internalId: 123,
      });
    });

    it('handles trailing underscores', () => {
      const input = {
        key_: 'value',
        name_: 'John',
      };
      const result = mapKeysToCamelCase(input);

      expect(result).toStrictEqual({
        key: 'value',
        name: 'John',
      });
    });

    it('handles consecutive underscores', () => {
      const input = {
        first__name: 'John',
        user___id: '123',
      };
      const result = mapKeysToCamelCase(input);

      // lodash camelCase handles consecutive underscores
      expect(result).toHaveProperty('firstName');
      expect(result).toHaveProperty('userId');
    });

    it('handles numbers in keys with underscores', () => {
      const input = {
        item_1_name: 'First',
        user_2_id: '456',
      };
      const result = mapKeysToCamelCase(input);

      expect(result).toStrictEqual({
        item1Name: 'First',
        user2Id: '456',
      });
    });
  });

  describe('Complex real-world scenarios', () => {
    it('transforms only top-level keys from a realistic API response object', () => {
      const apiResponse = {
        user_id: '12345',
        first_name: 'John',
        last_name: 'Doe',
        email_address: 'john@example.com',
        is_active: true,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-12-01T00:00:00Z',
        profile_data: {
          bio_text: 'Software Developer',
          profile_image_url: 'https://example.com/avatar.jpg',
          location_info: {
            city_name: 'New York',
            state_code: 'NY',
            postal_code: '10001',
          },
        },
      };
      const result = mapKeysToCamelCase(apiResponse);

      expect(result).toStrictEqual({
        userId: '12345',
        firstName: 'John',
        lastName: 'Doe',
        emailAddress: 'john@example.com',
        isActive: true,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-12-01T00:00:00Z',
        profileData: {
          bio_text: 'Software Developer',
          profile_image_url: 'https://example.com/avatar.jpg',
          location_info: {
            city_name: 'New York',
            state_code: 'NY',
            postal_code: '10001',
          },
        },
      });
    });

    it('handles mixed nested structures with various data types (top-level only)', () => {
      const input = {
        database_record: {
          record_id: 'REC-001',
          is_archived: false,
          archive_date: null,
          tags: ['important', 'urgent'],
          metadata: {
            created_by_user: 'admin',
            last_modified_date: '2023-11-15',
          },
          numeric_value: 42,
        },
      };
      const result = mapKeysToCamelCase(input);

      expect(result).toStrictEqual({
        databaseRecord: {
          record_id: 'REC-001',
          is_archived: false,
          archive_date: null,
          tags: ['important', 'urgent'],
          metadata: {
            created_by_user: 'admin',
            last_modified_date: '2023-11-15',
          },
          numeric_value: 42,
        },
      });
    });

    it('handles GraphQL-like query response with nested objects and arrays (top-level only)', () => {
      const input = {
        user_profile: {
          user_id: '123',
          first_name: 'Alice',
          last_name: 'Johnson',
          address_list: [
            { street_name: '123 Main', zip_code: '10001' },
            { street_name: '456 Oak', zip_code: '10002' },
          ],
          phone_numbers: ['555-1234', '555-5678'],
        },
      };
      const result = mapKeysToCamelCase(input);

      // Only top-level key is transformed
      expect(result).toStrictEqual({
        userProfile: {
          user_id: '123',
          first_name: 'Alice',
          last_name: 'Johnson',
          address_list: [
            { street_name: '123 Main', zip_code: '10001' },
            { street_name: '456 Oak', zip_code: '10002' },
          ],
          phone_numbers: ['555-1234', '555-5678'],
        },
      });
    });
  });

  describe('Type safety', () => {
    it('maintains type information for string values', () => {
      const input = { user_name: 'John' };
      const result = mapKeysToCamelCase(input);

      expect(typeof result.userName).toBe('string');
      expect(result.userName).toBe('John');
    });

    it('maintains type information for numeric values', () => {
      const input = { user_age: 30 };
      const result = mapKeysToCamelCase(input);

      expect(typeof result.userAge).toBe('number');
      expect(result.userAge).toBe(30);
    });

    it('maintains type information for boolean values', () => {
      const input = { is_active: true };
      const result = mapKeysToCamelCase(input);

      expect(typeof result.isActive).toBe('boolean');
      expect(result.isActive).toBe(true);
    });

    it('maintains object type for nested objects', () => {
      const input = { user_info: { name: 'John' } };
      const result = mapKeysToCamelCase(input);

      expect(typeof result.userInfo).toBe('object');
      expect(result.userInfo).not.toBeNull();
      expect(result.userInfo).toHaveProperty('name');
    });
  });

  describe('Idempotency', () => {
    it('applying the function twice produces the same result as applying it once', () => {
      const input = { first_name: 'John', last_name: 'Doe' };
      const resultOnce = mapKeysToCamelCase(input);
      const resultTwice = mapKeysToCamelCase(resultOnce);

      expect(resultOnce).toStrictEqual(resultTwice);
    });

    it('handles already camelCase input without errors', () => {
      const input = { firstName: 'John', lastName: 'Doe' };
      const result = mapKeysToCamelCase(input);

      expect(result).toStrictEqual({
        firstName: 'John',
        lastName: 'Doe',
      });
    });
  });

  describe('Special characters and encoding', () => {
    it('handles values with special characters', () => {
      const input = {
        user_name: 'John & Jane',
        email_address: 'john+jane@example.com',
        description: 'Hello "World"',
      };
      const result = mapKeysToCamelCase(input);

      expect(result).toStrictEqual({
        userName: 'John & Jane',
        emailAddress: 'john+jane@example.com',
        description: 'Hello "World"',
      });
    });

    it('handles values with Unicode characters', () => {
      const input = {
        user_name: 'Jöhn Döe',
        city_name: 'München',
        description: '你好世界',
      };
      const result = mapKeysToCamelCase(input);

      expect(result).toStrictEqual({
        userName: 'Jöhn Döe',
        cityName: 'München',
        description: '你好世界',
      });
    });
  });

  describe('Large objects', () => {
    it('handles objects with many keys', () => {
      const input = {
        field_1: 'value1',
        field_2: 'value2',
        field_3: 'value3',
        field_4: 'value4',
        field_5: 'value5',
        field_6: 'value6',
        field_7: 'value7',
        field_8: 'value8',
        field_9: 'value9',
        field_10: 'value10',
      };
      const result = mapKeysToCamelCase(input);

      expect(result).toStrictEqual({
        field1: 'value1',
        field2: 'value2',
        field3: 'value3',
        field4: 'value4',
        field5: 'value5',
        field6: 'value6',
        field7: 'value7',
        field8: 'value8',
        field9: 'value9',
        field10: 'value10',
      });
    });

    it('handles structures with many keys and nested objects (top-level only)', () => {
      const input = {
        level_1a: {
          level_2a: {
            level_3a: { value_a: 'A' },
            level_3b: { value_b: 'B' },
          },
          level_2b: {
            level_3c: { value_c: 'C' },
          },
        },
        level_1b: {
          level_2c: {
            level_3d: { value_d: 'D' },
          },
        },
      };
      const result = mapKeysToCamelCase(input);

      // Only top-level keys are transformed
      // Note: lodash camelCase capitalizes after numbers, so level_1a becomes level1A
      expect(result).toStrictEqual({
        level1A: {
          level_2a: {
            level_3a: { value_a: 'A' },
            level_3b: { value_b: 'B' },
          },
          level_2b: {
            level_3c: { value_c: 'C' },
          },
        },
        level1B: {
          level_2c: {
            level_3d: { value_d: 'D' },
          },
        },
      });
    });
  });
});
