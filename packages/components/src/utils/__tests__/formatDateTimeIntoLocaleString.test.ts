import { describe, it, expect } from 'vitest';
import formatDateTimeIntoLocaleString from '../formatDateTimeIntoLocaleString';

describe('formatDateTimeIntoLocaleString', () => {
  const testCases = [
    {
      date: new Date(2023, 9, 27, 10, 0, 0), // Month is 0-indexed, so 9 is October
      expected: '27.10.2023 10:00',
    },
    { date: new Date(2023, 0, 5, 8, 5, 0), expected: '5.1.2023 08:05' },
    { date: new Date(2024, 11, 31, 23, 59, 0), expected: '31.12.2024 23:59' },
    { date: new Date(2025, 0, 1, 0, 0, 0), expected: '1.1.2025 00:00' },
  ];

  it.each(testCases)(
    'should format $date correctly to $expected',
    ({ date, expected }) => {
      expect(formatDateTimeIntoLocaleString(date)).toBe(expected);
    }
  );
});
