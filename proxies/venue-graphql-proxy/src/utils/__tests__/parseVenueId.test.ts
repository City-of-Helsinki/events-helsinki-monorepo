import { describe, it, expect } from 'vitest';
import parseVenueId, { IdParseError } from '../parseVenueId.js';

describe('parseVenueId', () => {
  describe('happy path', () => {
    it('parses tprek source with id correctly', () => {
      const result = parseVenueId('tprek:12345');
      expect(result).toStrictEqual(['tprek', '12345']);
    });

    it('parses linked source with id correctly', () => {
      const result = parseVenueId('linked:67890');
      expect(result).toStrictEqual(['linked', '67890']);
    });

    it('splits on the first colon only, ignoring the rest (extra colons in id)', () => {
      // split(':') splits on ALL colons; destructuring [source, id] takes the first two,
      // so anything after the second colon is silently dropped.
      const result = parseVenueId('tprek:id:with:colons');
      expect(result).toStrictEqual(['tprek', 'id']);
    });
  });

  describe('error handling - array input', () => {
    it('throws TypeError when venueId is an array', () => {
      expect(() => parseVenueId(['tprek:12345'])).toThrow(TypeError);
      expect(() => parseVenueId(['tprek:12345'])).toThrow(
        'Array IDs are not supported'
      );
    });
  });

  describe('error handling - missing source', () => {
    it('throws IdParseError when venueId is an empty string', () => {
      expect(() => parseVenueId('')).toThrow(IdParseError);
      expect(() => parseVenueId('')).toThrow(
        'Could not find source from venue id'
      );
    });
  });

  describe('error handling - unsupported source', () => {
    it('throws IdParseError for any source other than tprek or linked', () => {
      const invalidSources = [
        'unknown',
        'custom',
        'tpreck',
        'TPREK',
        'LINKED',
        'tprek!',
      ];

      invalidSources.forEach((source) => {
        expect(() => parseVenueId(`${source}:123`)).toThrow(IdParseError);
        expect(() => parseVenueId(`${source}:123`)).toThrow(
          `Found unsupported source from venue id: ${source}`
        );
      });
    });
  });

  describe('error handling - missing id', () => {
    it('throws IdParseError when id is empty (trailing colon)', () => {
      expect(() => parseVenueId('tprek:')).toThrow(IdParseError);
      expect(() => parseVenueId('tprek:')).toThrow(
        'Could not find id from venue id'
      );
    });
  });

  describe('order of validation', () => {
    it('checks for array type before parsing the string', () => {
      expect(() => parseVenueId([':'])).toThrow(TypeError);
    });

    it('checks for missing source before checking source validity', () => {
      expect(() => parseVenueId(':12345')).toThrow(
        'Could not find source from venue id'
      );
    });

    it('checks for unsupported source before checking for missing id', () => {
      expect(() => parseVenueId('unknown:')).toThrow(
        'Found unsupported source from venue id: unknown'
      );
    });
  });

  describe('IdParseError custom error class', () => {
    it('is an instance of Error with the correct name', () => {
      const error = new IdParseError('test message');
      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe('IdParseError');
      expect(error.message).toBe('test message');
    });

    it('can be caught as either IdParseError or Error', () => {
      try {
        parseVenueId('unknown:id');
        expect.fail('Should have thrown IdParseError');
      } catch (error) {
        expect(error).toBeInstanceOf(IdParseError);
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
