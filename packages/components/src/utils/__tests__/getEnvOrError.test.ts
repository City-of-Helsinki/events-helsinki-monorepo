import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import getEnvOrError from '../getEnvOrError';

describe('getEnvOrError', () => {
  // Store original process.env
  const originalEnv = { ...process.env };

  beforeEach(() => {
    // Reset process.env to a clean state before each test
    process.env = { NODE_ENV: 'test' };
  });

  afterEach(() => {
    // Restore original process.env after each test
    process.env = originalEnv;
  });

  it('should return the value when the environment variable is set', () => {
    const key = 'TEST_VAR';
    const value = 'test-value';
    process.env[key] = value;

    expect(getEnvOrError(process.env[key], key)).toBe(value);
  });

  const errorTestCases = [
    {
      description: 'is not defined',
      key: 'UNDEFINED_VAR',
      value: undefined,
    },
    { description: 'is an empty string', key: 'EMPTY_VAR', value: '' },
  ];

  it.each(errorTestCases)(
    'should throw an error when the environment variable $description',
    ({ key, value }) => {
      // For the 'undefined' case, we don't set it at all, so process.env[key] is undefined.
      if (value !== undefined) {
        process.env[key] = value;
      }
      expect(() => getEnvOrError(process.env[key], key)).toThrow(
        `Environment variable with name ${key} was not found`
      );
    }
  );
});
