import { DataSourceWithContext } from '@events-helsinki/graphql-proxy-server/src';
import type { Interval } from 'date-fns';
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  lightFormat,
  // eslint-disable-next-line import/no-duplicates
} from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import fi from 'date-fns/locale/fi';

import type VenueContext from '../context/VenueContext';
import type { OpeningHour } from '../types/types';

import type { VenueDataSources } from '../types/VenueDataSources';
import mapKeysToCamelCase from '../utils/map-keys-to-camel-case';

type DateInterval = {
  start: Date;
  end: Date;
};

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export default class HaukiDataSource extends DataSourceWithContext<
  VenueDataSources,
  VenueContext
> {
  public constructor(contextValue: VenueContext) {
    super(contextValue);
    if (!process.env.GRAPHQL_PROXY_HAUKI_DATASOURCE) {
      throw new Error(
        'Environment variable "GRAPHQL_PROXY_HAUKI_DATASOURCE" is not set!'
      );
    }
    this.baseURL = process.env.GRAPHQL_PROXY_HAUKI_DATASOURCE;
  }

  static getOngoingWeekAsInterval(): DateInterval {
    const now = new Date();

    return {
      start: startOfWeek(now, { locale: fi }),
      end: endOfWeek(now, { locale: fi }),
    };
  }

  static patchMissingDates(
    interval: Interval,
    values?: OpeningHour[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultValue?: OpeningHour | ((date: Date) => OpeningHour)
  ): OpeningHour[] {
    if (!values) {
      return [];
    }

    const dates = eachDayOfInterval(interval);

    return dates
      .map((date) => {
        const value = values.find(
          (value) => value?.date === lightFormat(date, 'yyyy-MM-dd')
        );
        const resolvedDefaultValue =
          typeof defaultValue === 'function'
            ? defaultValue(date)
            : defaultValue;

        return value ?? resolvedDefaultValue;
      })
      .filter(notEmpty);
  }

  /**
   * @param {!string} id
   * @returns {Promise<?Array>} A list of opening hours in Hauki format for the
   * ongoing week, with the exception that dates without opening hours are
   * represented with an object that has an empty times array instead of
   * undefined.
   * @throws {AxiosError}
   */
  async getOpeningHours(id: string): Promise<OpeningHour[] | null> {
    const params = new URLSearchParams();

    const ongoingWeekInterval = HaukiDataSource.getOngoingWeekAsInterval();
    params.append('start_date', ongoingWeekInterval.start.toJSON());
    params.append('end_date', ongoingWeekInterval.end.toJSON());

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await this.get<any>(
      `resource/${id}/opening_hours/?${params.toString()}`
    );

    const transformedOpeningHours = HaukiDataSource.patchMissingDates(
      ongoingWeekInterval,
      data,
      (date: Date) => ({
        date: lightFormat(date, 'yyyy-MM-dd'),
        times: [],
      })
    )?.map(mapKeysToCamelCase);

    return transformedOpeningHours ?? null;
  }

  /**
   * @param {!string} id
   * @returns {Promise<?Boolean>} A boolean value that's based on the
   * is_open_now data for the resource. In case data is missing, null may be
   * returned.
   * @throws {AxiosError}
   */
  async getIsOpen(id: string): Promise<boolean | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await this.get<any>(`resource/${id}/is_open_now/`);

    return data?.is_open ?? null;
  }
}

export type OpeningHoursType = Awaited<
  ReturnType<HaukiDataSource['getOpeningHours']>
>;
export type IsOpenType = Awaited<ReturnType<HaukiDataSource['getIsOpen']>>;
