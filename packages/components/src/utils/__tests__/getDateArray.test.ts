import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import getDateArray from '../getDateArray';

describe('getDateArray', () => {
  const originalTz = process.env.TZ;

  beforeEach(() => {
    // Set timezone to UTC for consistent test results
    process.env.TZ = 'UTC';
  });

  afterEach(() => {
    // Restore original timezone
    process.env.TZ = originalTz;
  });

  const testCases = [
    { date: '2023-10-27T10:30:00.000Z', expected: [2023, 10, 27, 10, 30] },
    { date: '2024-01-01T00:00:00.000Z', expected: [2024, 1, 1, 0, 0] },
    { date: '2022-12-31T23:59:00.000Z', expected: [2022, 12, 31, 23, 59] },
    { date: '2023-02-28T05:01:00.000Z', expected: [2023, 2, 28, 5, 1] },
  ];

  it.each(testCases)(
    'should convert date string $date to DateArray $expected in UTC',
    ({ date, expected }) => {
      expect(getDateArray(date)).toStrictEqual(expected);
    }
  );
});
