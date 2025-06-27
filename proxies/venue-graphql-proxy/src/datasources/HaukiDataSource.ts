import { DataSourceWithContext } from '@events-helsinki/graphql-proxy-server';
import type { Interval } from 'date-fns';
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  lightFormat,
} from 'date-fns';

import fi from 'date-fns/locale/fi/index.js';

import { GraphQLError } from 'graphql';
import get from 'lodash/get.js';
import type VenueContext from '../context/VenueContext.js';
import type { VenueDataSources } from '../types/VenueDataSources.js';
import type { HaukiIsOpen, HaukiOpeningHours } from '../types.js';

/** Get the status code from a GraphQLError. */
function graphQLErrorStatus(error: unknown): number | null {
  if (error instanceof GraphQLError) {
    const extensions = error.extensions;
    const status = Number(get(extensions, 'response.status'));
    if (Number.isInteger(status)) {
      return status;
    }
  }
  return null;
}

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

  static getOngoingWeekAsInterval(): { start: Date; end: Date } {
    const now = new Date();

    return {
      start: startOfWeek(now, { locale: fi }),
      end: endOfWeek(now, { locale: fi }),
    };
  }

  static patchMissingDates(
    interval: Interval,
    values?: HaukiOpeningHours[] | null
  ): HaukiOpeningHours[] {
    if (!values) {
      return [];
    }

    const dates = eachDayOfInterval(interval);

    return dates
      .map((date) => {
        const value = values.find(
          (value) => value?.date === lightFormat(date, 'yyyy-MM-dd')
        );

        const noOpeningHoursForDate = {
          date: lightFormat(date, 'yyyy-MM-dd'),
          times: [],
        };

        return value ?? noOpeningHoursForDate;
      })
      .filter(notEmpty);
  }

  /**
   * Get opening hours for a resource.
   * @param id
   * @returns A list of opening hours in Hauki format for the
   * ongoing week, with the exception that dates without opening hours are
   * represented with an object that has an empty times array instead of
   * undefined. Returns null if no opening hours are available.
   * @throws {AxiosError}
   * @see https://hauki.api.hel.fi/api_docs/#tag/v1/operation/v1_resource_opening_hours_retrieve
   */
  async getOpeningHours(id: string): Promise<HaukiOpeningHours[] | null> {
    const params = new URLSearchParams();

    const ongoingWeekInterval = HaukiDataSource.getOngoingWeekAsInterval();
    params.append('start_date', ongoingWeekInterval.start.toJSON());
    params.append('end_date', ongoingWeekInterval.end.toJSON());

    try {
      const data = await this.get<HaukiOpeningHours[]>(
        `resource/${id}/opening_hours/?${params.toString()}`
      );

      const transformedOpeningHours = HaukiDataSource.patchMissingDates(
        ongoingWeekInterval,
        data
      );

      return transformedOpeningHours ?? null;
    } catch (error) {
      if (graphQLErrorStatus(error) == 404) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Is the resource open right now?
   * @param id
   * @returns HaukiIsOpen with is_open true if resource is open right now,
   * HaukiIsOpen with is_open false if resource is not open right now, or
   * null if no information is available.
   * @throws {AxiosError}
   * @see https://hauki.api.hel.fi/api_docs/#tag/v1/operation/v1_resource_is_open_now_retrieve
   */
  async getIsOpen(id: string): Promise<HaukiIsOpen | null> {
    try {
      return await this.get<HaukiIsOpen>(`resource/${id}/is_open_now/`);
    } catch (error) {
      if (graphQLErrorStatus(error) == 404) {
        return null;
      }
      throw error;
    }
  }
}
