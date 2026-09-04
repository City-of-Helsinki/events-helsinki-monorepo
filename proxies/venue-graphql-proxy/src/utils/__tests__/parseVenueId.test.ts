import { describe, it, expect } from 'vitest';
import parseVenueId, { IdParseError } from '../parseVenueId.js';

describe('parseVenueId', () => {
  describe('happy path - successful parsing', () => {
    it('parses tprek source with id correctly', () => {
      const result = parseVenueId('tprek:12345');
      expect(result).toStrictEqual(['tprek', '12345']);
    });

    it('parses linked source with id correctly', () => {
      const result = parseVenueId('linked:67890');
      expect(result).toStrictEqual(['linked', '67890']);
    });

    it('parses id with numeric characters', () => {
      const result = parseVenueId('tprek:999');
      expect(result).toStrictEqual(['tprek', '999']);
    });

    it('parses id with alphanumeric characters', () => {
      const result = parseVenueId('linked:abc123xyz');
      expect(result).toStrictEqual(['linked', 'abc123xyz']);
    });

    it('parses id with special characters after colon', () => {
      const result = parseVenueId('tprek:id-with-dashes_and_underscores');
      expect(result).toStrictEqual(['tprek', 'id-with-dashes_and_underscores']);
    });

    it('parses id with colon character in it (split only uses first colon)', () => {
      // Note: split(':') splits on ALL colons, so 'tprek:id:with:colons' becomes ['tprek', 'id', 'with', 'colons']
      // The destructuring [source, id] = split(':') takes first two, so id = 'id'
      const result = parseVenueId('tprek:id:with:colons');
      expect(result).toStrictEqual(['tprek', 'id']);
    });
  });

  describe('error handling - TypeError for arrays', () => {
    it('throws TypeError when venueId is an array with single element', () => {
      expect(() => {
        parseVenueId(['tprek:12345']);
      }).toThrow(TypeError);
      expect(() => {
        parseVenueId(['tprek:12345']);
      }).toThrow('Array IDs are not supported');
    });

    it('throws TypeError when venueId is an array with multiple elements', () => {
      expect(() => {
        parseVenueId(['tprek:12345', 'linked:67890']);
      }).toThrow(TypeError);
      expect(() => {
        parseVenueId(['tprek:12345', 'linked:67890']);
      }).toThrow('Array IDs are not supported');
    });

    it('throws TypeError when venueId is an empty array', () => {
      expect(() => {
        parseVenueId([]);
      }).toThrow(TypeError);
      expect(() => {
        parseVenueId([]);
      }).toThrow('Array IDs are not supported');
    });
  });

  describe('error handling - missing source (no colon separator)', () => {
    it('throws IdParseError when venueId has no colon separator', () => {
      // When no colon exists, the whole string becomes the "source"
      // Since 'tprek12345' is not a valid source, it throws unsupported source error
      expect(() => {
        parseVenueId('tprek12345');
      }).toThrow(IdParseError);
      expect(() => {
        parseVenueId('tprek12345');
      }).toThrow('Found unsupported source from venue id: tprek12345');
    });

    it('throws IdParseError when venueId is only an id without source', () => {
      // '12345' becomes source='12345' which is not in SUPPORTED_SOURCES
      expect(() => {
        parseVenueId('12345');
      }).toThrow(IdParseError);
      expect(() => {
        parseVenueId('12345');
      }).toThrow('Found unsupported source from venue id: 12345');
    });

    it('throws IdParseError when venueId is empty string', () => {
      expect(() => {
        parseVenueId('');
      }).toThrow(IdParseError);
      expect(() => {
        parseVenueId('');
      }).toThrow('Could not find source from venue id');
    });
  });

  describe('error handling - empty source (malformed: :id)', () => {
    it('throws IdParseError when source is empty (starts with colon)', () => {
      expect(() => {
        parseVenueId(':12345');
      }).toThrow(IdParseError);
      expect(() => {
        parseVenueId(':12345');
      }).toThrow('Could not find source from venue id');
    });

    it('throws IdParseError when venueId is only a colon', () => {
      expect(() => {
        parseVenueId(':');
      }).toThrow(IdParseError);
      expect(() => {
        parseVenueId(':');
      }).toThrow('Could not find source from venue id');
    });

    it('throws IdParseError when source is empty with spaces around colon', () => {
      expect(() => {
        parseVenueId(' :12345');
      }).toThrow(IdParseError);
    });
  });

  describe('error handling - unsupported source', () => {
    it('throws IdParseError when source is unknown', () => {
      expect(() => {
        parseVenueId('unknown:12345');
      }).toThrow(IdParseError);
      expect(() => {
        parseVenueId('unknown:12345');
      }).toThrow('Found unsupported source from venue id: unknown');
    });

    it('throws IdParseError when source is not tprek or linked', () => {
      expect(() => {
        parseVenueId('custom:67890');
      }).toThrow(IdParseError);
      expect(() => {
        parseVenueId('custom:67890');
      }).toThrow('Found unsupported source from venue id: custom');
    });

    it('throws IdParseError when source is misspelled (e.g., tpreck instead of tprek)', () => {
      expect(() => {
        parseVenueId('tpreck:12345');
      }).toThrow(IdParseError);
      expect(() => {
        parseVenueId('tpreck:12345');
      }).toThrow('Found unsupported source from venue id: tpreck');
    });

    it('throws IdParseError when source is case-sensitive mismatch (e.g., TPREK instead of tprek)', () => {
      expect(() => {
        parseVenueId('TPREK:12345');
      }).toThrow(IdParseError);
      expect(() => {
        parseVenueId('TPREK:12345');
      }).toThrow('Found unsupported source from venue id: TPREK');
    });

    it('throws IdParseError when source is LINKED in uppercase', () => {
      expect(() => {
        parseVenueId('LINKED:67890');
      }).toThrow(IdParseError);
      expect(() => {
        parseVenueId('LINKED:67890');
      }).toThrow('Found unsupported source from venue id: LINKED');
    });

    it('throws IdParseError when source contains invalid characters', () => {
      expect(() => {
        parseVenueId('tprek!:12345');
      }).toThrow(IdParseError);
    });
  });

  describe('error handling - missing id (malformed: source:)', () => {
    it('throws IdParseError when id is empty (ends with colon)', () => {
      expect(() => {
        parseVenueId('tprek:');
      }).toThrow(IdParseError);
      expect(() => {
        parseVenueId('tprek:');
      }).toThrow('Could not find id from venue id');
    });

    it('throws IdParseError when linked source has no id', () => {
      expect(() => {
        parseVenueId('linked:');
      }).toThrow(IdParseError);
      expect(() => {
        parseVenueId('linked:');
      }).toThrow('Could not find id from venue id');
    });

    it('accepts id with leading whitespace as valid (spaces are valid characters in id)', () => {
      // 'tprek: ' has a space as the id, which is a non-empty string
      const result = parseVenueId('tprek: ');
      expect(result).toStrictEqual(['tprek', ' ']);
    });
  });

  describe('error handling - order of validation', () => {
    it('checks for array type first before parsing', () => {
      // Array check happens before split, so TypeError is thrown
      expect(() => {
        parseVenueId([':']);
      }).toThrow(TypeError);
    });

    it('checks for missing source before checking source validity', () => {
      // No source error is thrown before unsupported source error
      expect(() => {
        parseVenueId(':12345');
      }).toThrow('Could not find source from venue id');
    });

    it('checks for unsupported source before checking for missing id', () => {
      // Unsupported source error is thrown before missing id error
      expect(() => {
        parseVenueId('unknown:');
      }).toThrow('Found unsupported source from venue id: unknown');
    });
  });

  describe('edge cases', () => {
    it('handles venueId with leading/trailing whitespace', () => {
      // Note: The function doesn't trim whitespace, so this tests actual behavior
      expect(() => {
        parseVenueId('  tprek:12345');
      }).toThrow(IdParseError);
    });

    it('handles very long id value', () => {
      const longId = 'a'.repeat(1000);
      const result = parseVenueId(`tprek:${longId}`);
      expect(result).toStrictEqual(['tprek', longId]);
    });

    it('returns source as Source type (string)', () => {
      const result = parseVenueId('tprek:12345');
      expect(typeof result[0]).toBe('string');
      expect(typeof result[1]).toBe('string');
    });

    it('returns null is not thrown - function returns tuple on success', () => {
      const result = parseVenueId('linked:abc123');
      expect(result).not.toBeNull();
      expect(Array.isArray(result)).toBe(true);
      expect(result?.length).toBe(2);
    });
  });

  describe('IdParseError custom error class', () => {
    it('is an instance of Error', () => {
      expect(new IdParseError('test')).toBeInstanceOf(Error);
    });

    it('has correct name property', () => {
      const error = new IdParseError('test message');
      expect(error.name).toBe('IdParseError');
    });

    it('has correct message', () => {
      const message = 'test error message';
      const error = new IdParseError(message);
      expect(error.message).toBe(message);
    });

    it('can be caught as IdParseError', () => {
      try {
        parseVenueId('unknown:id');
        expect.fail('Should have thrown IdParseError');
      } catch (error) {
        expect(error).toBeInstanceOf(IdParseError);
      }
    });

    it('can be caught as Error', () => {
      try {
        parseVenueId('unknown:id');
        expect.fail('Should have thrown error');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('return type validation', () => {
    it('returns a tuple with exactly two elements', () => {
      const result = parseVenueId('tprek:123');
      expect(result).toHaveLength(2);
    });

    it('returns first element as source string (tprek)', () => {
      const [source] = parseVenueId('tprek:123');
      expect(source).toBe('tprek');
    });

    it('returns first element as source string (linked)', () => {
      const [source] = parseVenueId('linked:456');
      expect(source).toBe('linked');
    });

    it('returns second element as id string', () => {
      const [, id] = parseVenueId('tprek:my-id-123');
      expect(id).toBe('my-id-123');
    });

    it('preserves exact id value including special characters', () => {
      const testId = 'id-with_special.chars~!@#$%';
      const [, id] = parseVenueId(`tprek:${testId}`);
      expect(id).toBe(testId);
    });
  });

  describe('supported sources validation', () => {
    it('accepts tprek as valid source', () => {
      expect(() => {
        parseVenueId('tprek:123');
      }).not.toThrow();
    });

    it('accepts linked as valid source', () => {
      expect(() => {
        parseVenueId('linked:456');
      }).not.toThrow();
    });

    it('rejects any source other than tprek or linked', () => {
      const invalidSources = [
        'tprek1',
        'linked2',
        'tp',
        'link',
        'tprekId',
        'linkedId',
        'tprek_id',
        'linked-id',
      ];

      invalidSources.forEach((source) => {
        expect(() => {
          parseVenueId(`${source}:123`);
        }).toThrow(IdParseError);
      });
    });
  });
});
