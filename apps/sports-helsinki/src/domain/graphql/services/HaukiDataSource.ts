import type { DataSourceConfig } from '@apollo/datasource-rest/dist/RESTDataSource';
import camelCaseKeys from 'camelcase-keys';
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
import { dataSourceHaukiLogger } from '../../../logger';
import type { OpeningHour } from '../../nextApi/graphql/__imported__';
import RESTDataSource from '../utils/RESTDataSource';

type DateInterval = {
  start: Date;
  end: Date;
};

function getOngoingWeekAsInterval(): DateInterval {
  const now = new Date();

  return {
    start: startOfWeek(now, { locale: fi }),
    end: endOfWeek(now, { locale: fi }),
  };
}

function patchMissingDates(
  interval: Interval,
  values?: OpeningHour[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue: any = null
) {
  if (!values) {
    return values;
  }

  const dates = eachDayOfInterval(interval);

  return dates.map((date) => {
    const value = values.find(
      (value) => value?.date === lightFormat(date, 'yyyy-MM-dd')
    );
    const resolvedDefaultValue =
      typeof defaultValue === 'function' ? defaultValue(date) : defaultValue;

    return value ?? resolvedDefaultValue;
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toCamelCase<T extends Record<string, unknown>[]>(obj: any) {
  return camelCaseKeys<T>(obj, { deep: true });
}

export default class Hauki extends RESTDataSource {
  override baseURL = 'https://hauki.api.hel.fi/v1/';

  constructor(config: DataSourceConfig, logger = dataSourceHaukiLogger) {
    super(config);
    this.logger = logger;
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

    const ongoingWeekInterval = getOngoingWeekAsInterval();
    params.append('start_date', ongoingWeekInterval.start.toJSON());
    params.append('end_date', ongoingWeekInterval.end.toJSON());

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await this.get<any>(
      `resource/${id}/opening_hours/?${params.toString()}`
    );

    const transformedOpeningHours = toCamelCase<OpeningHour[]>(
      patchMissingDates(ongoingWeekInterval, data, (date: Date) => ({
        date: lightFormat(date, 'yyyy-MM-dd'),
        times: [],
      }))
    );

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
