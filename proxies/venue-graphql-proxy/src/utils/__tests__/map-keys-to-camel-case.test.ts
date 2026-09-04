import { describe, it, expect } from 'vitest';
import mapKeysToCamelCase from '../map-keys-to-camel-case.js';

describe('mapKeysToCamelCase', () => {
  it('converts simple snake_case keys to camelCase', () => {
    const input = { first_name: 'John', last_name: 'Doe' };
    const result = mapKeysToCamelCase(input);

    expect(result).toStrictEqual({
      firstName: 'John',
      lastName: 'Doe',
    });
  });

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

  it('returns empty object for empty input', () => {
    const input = {};
    const result = mapKeysToCamelCase(input);

    expect(result).toStrictEqual({});
  });

  it('transforms only top-level keys and does not recursively transform nested object keys', () => {
    const input = {
      user_info: {
        first_name: 'John',
        last_name: 'Doe',
      },
      profile_data: {
        bio_text: 'Developer',
        location_info: {
          city_name: 'NYC',
        },
      },
    };
    const result = mapKeysToCamelCase(input);

    expect(result).toStrictEqual({
      userInfo: {
        first_name: 'John',
        last_name: 'Doe',
      },
      profileData: {
        bio_text: 'Developer',
        location_info: {
          city_name: 'NYC',
        },
      },
    });
  });

  it('preserves arrays as-is without modifying array elements', () => {
    const input = {
      user_names: ['John', 'Jane', 'Bob'],
      items_list: [
        { first_name: 'John', last_name: 'Doe' },
        { first_name: 'Jane', last_name: 'Smith' },
      ],
    };
    const result = mapKeysToCamelCase(input);

    expect(result).toStrictEqual({
      userNames: ['John', 'Jane', 'Bob'],
      itemsList: [
        { first_name: 'John', last_name: 'Doe' },
        { first_name: 'Jane', last_name: 'Smith' },
      ],
    });
  });
});
