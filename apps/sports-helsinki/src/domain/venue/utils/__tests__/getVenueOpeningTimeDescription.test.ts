import type { OpeningHour, Time } from '@events-helsinki/components';
import { ResourceState } from '@events-helsinki/components';
import { startOfDay } from 'date-fns';
import getVenueOpeningTimeDescription from '../getVenueOpeningTimeDescription';

function buildDateDocument(date: string, times: Partial<Time>[]): OpeningHour {
  return {
    date,
    times: times.map((time) => ({
      startTime: '08:00:00',
      endTime: '16:00:00',
      name: '',
      description: '',
      endTimeOnNextDay: false,
      resourceState: ResourceState.Open,
      fullDay: false,
      periods: [],
      ...time,
    })),
  };
}

function t(key: string) {
  if (key === 'utils:open_now_and_closes') {
    return 'Auki tällä hetkellä, sulkeutuu';
  }

  if (key === 'utils:closed_now_and_opens') {
    return 'Kiinni tällä hetkellä, aukeaa';
  }

  return key;
}

beforeEach(() => {
  vitest.useFakeTimers();
  vitest.setSystemTime(startOfDay(new Date('2012-05-01')));
});

afterAll(() => {
  vitest.useRealTimers();
});

it('returns null when times can not be found', () => {
  expect(getVenueOpeningTimeDescription([], 'fi', t)).toStrictEqual(null);
});

it('renders correct result when venue is closed', () => {
  // will be open today
  expect(
    getVenueOpeningTimeDescription(
      [
        buildDateDocument('2012-05-01', [
          {
            startTime: '08:00:00',
            endTime: '16:00:00',
          },
        ]),
      ],
      'fi',
      t
    )
  ).toMatchInlineSnapshot(`"Kiinni tällä hetkellä, aukeaa 08:00"`);
  // will be open day after tomorrow
  expect(
    getVenueOpeningTimeDescription(
      [
        buildDateDocument('2012-05-03', [
          {
            startTime: '07:00:00',
            endTime: '16:00:00',
          },
        ]),
        buildDateDocument('2012-05-04', [
          {
            startTime: '10:00:00',
            endTime: '16:00:00',
          },
        ]),
      ],
      'fi',
      t
    )
  ).toMatchInlineSnapshot(`"Kiinni tällä hetkellä, aukeaa 07:00"`);
});

it('renders correct result when venue is open', () => {
  vitest.setSystemTime(new Date(2012, 4, 1, 12, 0, 0, 0));

  expect(
    getVenueOpeningTimeDescription(
      [
        buildDateDocument('2012-05-01', [
          {
            startTime: '07:00:00',
            endTime: '23:00:00',
          },
        ]),
      ],
      'fi',
      t
    )
  ).toMatchInlineSnapshot(`"Auki tällä hetkellä, sulkeutuu 23:00"`);
});

it('renders resource state', () => {
  expect(
    getVenueOpeningTimeDescription(
      [
        buildDateDocument('2012-05-01', [
          {
            startTime: '08:00:00',
            endTime: '16:00:00',
            resourceState: ResourceState.WeatherPermitting,
          },
        ]),
      ],
      'fi',
      t
    )
  ).toMatchInlineSnapshot(
    `"Kiinni tällä hetkellä, aukeaa 08:00 (Sään salliessa)"`
  );
});

it('ignores closed times', () => {
  expect(
    getVenueOpeningTimeDescription(
      [
        buildDateDocument('2012-05-01', [
          {
            startTime: '08:00:00',
            endTime: '16:00:00',
            resourceState: ResourceState.Closed,
          },
        ]),
      ],
      'fi',
      t
    )
  ).toStrictEqual(null);
});
