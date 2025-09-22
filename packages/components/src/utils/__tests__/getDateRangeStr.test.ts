import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import getDateRangeStr from '../getDateRangeStr';

type getDateRangeStrProps = Parameters<typeof getDateRangeStr>[0];

describe('getDateRangeStr', () => {
  const originalTz = process.env.TZ;

  beforeEach(() => {
    // Set timezone to Europe/Helsinki for consistent test results
    process.env.TZ = 'Europe/Helsinki';
  });

  afterEach(() => {
    // Restore original timezone
    process.env.TZ = originalTz;
  });

  const testCases = [
    {
      props: {
        start: '2025-09-23T09:00:00Z',
        end: '2025-09-23T10:00:00Z',
        locale: 'fi',
        includeTime: true,
        timeAbbreviation: 'klo',
      },
      expected: 'Ti 23.9.2025, klo 12.00–13.00',
    },
    {
      props: {
        start: '2025-09-23T09:00:00Z',
        end: '2025-09-23T10:00:00Z',
        locale: 'fi',
        includeWeekday: false,
        includeTime: true,
        timeAbbreviation: 'klo',
      },
      expected: '23.9.2025, klo 12.00–13.00',
    },
    {
      props: {
        start: '2025-06-11T10:15:00Z',
        end: '2025-06-12T11:15:00Z',
        locale: 'fi',
        includeTime: true,
        timeAbbreviation: 'klo',
      },
      expected: 'Ke 11.6. – To 12.6.2025',
    },
    {
      props: {
        start: '2025-06-11T10:15:00Z',
        end: '2025-06-12T11:15:00Z',
        locale: 'fi',
        includeWeekday: false,
        includeTime: true,
        timeAbbreviation: 'klo',
      },
      expected: '11.6.–12.6.2025',
    },
    {
      props: {
        start: '2025-06-11T10:15:00Z',
        end: '2026-06-12T11:15:00Z',
        locale: 'fi',
        includeTime: true,
        timeAbbreviation: 'klo',
      },
      expected: 'Ke 11.6.2025 – Pe 12.6.2026',
    },
    {
      props: {
        start: '2025-06-11T10:15:00Z',
        end: '2026-06-12T11:15:00Z',
        locale: 'fi',
        includeWeekday: false,
        includeTime: true,
        timeAbbreviation: 'klo',
      },
      expected: '11.6.2025–12.6.2026',
    },
    {
      props: {
        start: '2025-06-10T10:15:00Z',
        end: '2025-09-26T11:15:00Z',
        locale: 'fi',
        includeTime: true,
        timeAbbreviation: 'klo',
      },
      expected: 'Ti 10.6. – Pe 26.9.2025',
    },
    {
      props: {
        start: '2025-06-10T10:15:00Z',
        end: '2025-09-26T11:15:00Z',
        locale: 'fi',
        includeWeekday: false,
        includeTime: true,
        timeAbbreviation: 'klo',
      },
      expected: '10.6.–26.9.2025',
    },
    {
      props: {
        start: '2025-06-10T10:15:00Z',
        end: '2026-09-26T11:15:00Z',
        locale: 'fi',
        includeTime: true,
        timeAbbreviation: 'klo',
      },
      expected: 'Ti 10.6.2025 – La 26.9.2026',
    },
    {
      props: {
        start: '2025-06-10T10:15:00Z',
        end: '2026-09-26T11:15:00Z',
        locale: 'fi',
        includeWeekday: false,
        includeTime: true,
        timeAbbreviation: 'klo',
      },
      expected: '10.6.2025–26.9.2026',
    },
    {
      props: {
        start: '2025-09-23T09:00:00Z',
        end: '2025-09-23T10:00:00Z',
        locale: 'sv',
        includeTime: true,
        timeAbbreviation: 'kl.',
      },
      expected: 'Ti 23.9.2025, kl. 12:00–13:00',
    },
    {
      props: {
        start: '2025-09-23T09:00:00Z',
        end: '2025-09-23T10:00:00Z',
        locale: 'sv',
        includeWeekday: false,
        includeTime: true,
        timeAbbreviation: 'kl.',
      },
      expected: '23.9.2025, kl. 12:00–13:00',
    },
    {
      props: {
        start: '2025-06-10T10:15:00Z',
        end: '2025-09-28T11:15:00Z',
        locale: 'sv',
        includeTime: true,
        timeAbbreviation: 'kl.',
      },
      expected: 'Ti 10.6. – Sö 28.9.2025',
    },
    {
      props: {
        start: '2025-06-10T10:15:00Z',
        end: '2025-09-28T11:15:00Z',
        locale: 'sv',
        includeWeekday: false,
        includeTime: true,
        timeAbbreviation: 'kl.',
      },
      expected: '10.6.–28.9.2025',
    },
    {
      props: {
        start: '2025-06-10T10:15:00Z',
        end: '2026-09-28T11:15:00Z',
        locale: 'sv',
        includeTime: true,
        timeAbbreviation: 'kl.',
      },
      expected: 'Ti 10.6.2025 – Må 28.9.2026',
    },
    {
      props: {
        start: '2025-06-10T10:15:00Z',
        end: '2026-09-28T11:15:00Z',
        locale: 'sv',
        includeWeekday: false,
        includeTime: true,
        timeAbbreviation: 'kl.',
      },
      expected: '10.6.2025–28.9.2026',
    },
    {
      props: {
        start: '2025-09-23T10:30:00Z',
        end: '2025-09-23T11:15:00Z',
        locale: 'en',
        includeTime: true,
        timeAbbreviation: 'at',
      },
      expected: 'Tue 23.9.2025, at 1:30 p.m.–2:15 p.m.',
    },
    {
      props: {
        start: '2025-09-23T10:30:00Z',
        end: '2025-09-23T11:15:00Z',
        locale: 'en',
        includeWeekday: false,
        includeTime: true,
        timeAbbreviation: 'at',
      },
      expected: '23.9.2025, at 1:30 p.m.–2:15 p.m.',
    },
    {
      props: {
        start: '2025-06-10T10:15:00Z',
        end: '2025-09-24T11:15:00Z',
        locale: 'en',
        includeTime: true,
        timeAbbreviation: 'at',
      },
      expected: 'Tue 10.6. – Wed 24.9.2025',
    },
    {
      props: {
        start: '2025-06-10T10:15:00Z',
        end: '2025-09-24T11:15:00Z',
        locale: 'en',
        includeWeekday: false,
        includeTime: true,
        timeAbbreviation: 'at',
      },
      expected: '10.6.–24.9.2025',
    },
    {
      props: {
        start: '2025-06-10T10:15:00Z',
        end: '2026-09-24T11:15:00Z',
        locale: 'en',
        includeTime: true,
        timeAbbreviation: 'at',
      },
      expected: 'Tue 10.6.2025 – Thu 24.9.2026',
    },
    {
      props: {
        start: '2025-06-10T10:15:00Z',
        end: '2026-09-24T11:15:00Z',
        locale: 'en',
        includeWeekday: false,
        includeTime: true,
        timeAbbreviation: 'at',
      },
      expected: '10.6.2025–24.9.2026',
    },
  ] as const satisfies Array<
    { props: getDateRangeStrProps } & { expected: string }
  >;

  it.each(testCases)(
    'getDateRangeStr($props) == $expected',
    ({ props, expected }) => {
      expect(getDateRangeStr(props)).toStrictEqual(expected);
    }
  );
});
