import type {
  Source,
  AnyObject,
  Context,
  VenueDetails,
} from '../../../nextApi/types';
import type VenueEnricher from './VenueEnricher';

export type VenueData = VenueDetails | VenueDetails<string>;

type Config<I> = {
  getDataSources?: (
    id: string,
    source: Source,
    context: Context
  ) => Promise<I>[];
  format?: (data: I, context: Context) => Partial<VenueData>;
  enrichers?: VenueEnricher<I, Partial<VenueData>>[];
};

export default class VenueResolverIntegration<I = AnyObject> {
  config: Config<I> = {};

  constructor(config: Config<I> = {}) {
    this.config = config;
  }

  getDataSources(id: string, source: Source, context: Context): Promise<I>[] {
    if (!this.config.getDataSources) {
      return [];
    }

    return this.config.getDataSources(id, source, context);
  }

  format(uncleanData: I, context: Context): Partial<VenueData> {
    if (this.config.format) {
      return this.config.format(uncleanData, context);
    }

    return uncleanData as unknown as VenueData;
  }

  async enrich(data: I, context: Context): Promise<Partial<VenueData>> {
    const enrichers =
      this.config.enrichers?.map((enricher) =>
        enricher.getEnrichments(data, context)
      ) ?? [];
    const enrichmentDataArray = await Promise.all(enrichers);
    const enrichmentData = enrichmentDataArray.reduce(
      (acc, data) =>
        ({
          ...acc,
          ...data,
        } as Partial<Partial<VenueData>>),
      {}
    );

    return enrichmentData as VenueData;
  }
}
