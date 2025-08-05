import type VenueContext from '../context/VenueContext.js';
import type { Source, TranslatedVenueDetails } from '../types.js';
import type IsOpenHaukiIntegration from './integrations/IsOpenHaukiIntegration.js';
import type OpeningHoursHaukiIntegration from './integrations/OpeningHoursHaukiIntegration.js';
import type VenueServiceMapIntegration from './integrations/VenueServiceMapIntegration.js';

type PossibleIntegrations =
  | VenueServiceMapIntegration
  | IsOpenHaukiIntegration
  | OpeningHoursHaukiIntegration;

type Config = {
  integrations: PossibleIntegrations[];
  merge?: (
    data: Partial<TranslatedVenueDetails>[]
  ) => Partial<TranslatedVenueDetails>;
};

export default class VenueResolver {
  config: Config;
  constructor(config: Config) {
    this.config = config;
  }

  async resolveVenue(
    id: string,
    source: Source,
    context: VenueContext
  ): Promise<Partial<TranslatedVenueDetails>> {
    const data = (
      await this.execute(this.config.integrations, id, source, context)
    ).flat();

    return this.merge(data);
  }

  private async execute(
    integrations: PossibleIntegrations[],
    id: string,
    source: Source,
    context: VenueContext
  ) {
    return Promise.all(
      integrations.map((integration) =>
        integration.execute(id, source, context)
      )
    );
  }

  private merge(
    data: Partial<TranslatedVenueDetails>[]
  ): Partial<TranslatedVenueDetails> {
    if (this.config.merge) {
      return this.config.merge(data);
    }

    return data.reduce(
      (acc, dataObject) => ({
        ...acc,
        ...dataObject,
      }),
      {}
    );
  }
}
