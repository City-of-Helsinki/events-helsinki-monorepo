import type {
  HaukiOpeningHours,
  HaukiTimeElement,
  TranslatedVenueDetails,
} from '../../types';
import type { OpeningHour, Time } from '../../types/types';
import type { HaukiIntegrationConfig } from './HaukiIntegrationConfig';
import VenueResolverIntegration from './VenueResolverIntegration';

function formatTimeElement(data: HaukiTimeElement): Time {
  return {
    name: data.name,
    description: data.description,
    startTime: data.start_time,
    endTime: data.end_time,
    endTimeOnNextDay: data.end_time_on_next_day,
    resourceState: data.resource_state,
    fullDay: data.full_day,
    periods: data.periods,
  };
}

function formatOpeningHours(data: HaukiOpeningHours): OpeningHour {
  return {
    date: data.date,
    times: data.times.map(formatTimeElement),
  };
}

export default class OpeningHoursHaukiIntegration extends VenueResolverIntegration<
  HaukiOpeningHours[] | null,
  Pick<TranslatedVenueDetails, 'openingHours'>
> {
  constructor(config: HaukiIntegrationConfig) {
    super({
      getDataSource: (id, source, { dataSources }) => {
        const haukiId = config.getId(id, source);
        return dataSources.hauki.getOpeningHours(haukiId);
      },
      format: (data, _context) => {
        return {
          openingHours:
            data === null
              ? null
              : data.map((haukiOpeningHours) =>
                  formatOpeningHours(haukiOpeningHours)
                ),
        };
      },
    });
  }
}
