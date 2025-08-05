import type VenueContext from '../../context/VenueContext.js';
import type { Source, TranslatedVenueDetails } from '../../types.js';
import type VenueEnricher from '../enrichers/VenueEnricher.js';

type Config<I, O> = {
  getDataSource: (
    id: string,
    source: Source,
    context: VenueContext
  ) => Promise<I>;
  format: (data: I, context: VenueContext) => O;
  enrichers?: VenueEnricher<I, Partial<TranslatedVenueDetails>>[];
};

export default class VenueResolverIntegration<I, O> {
  config: Config<I, O>;

  constructor(config: Config<I, O>) {
    this.config = config;
  }

  getDataSource(id: string, source: Source, context: VenueContext): Promise<I> {
    return this.config.getDataSource(id, source, context);
  }

  format(uncleanData: I, context: VenueContext): O {
    return this.config.format(uncleanData, context);
  }

  async enrich(
    data: I,
    context: VenueContext
  ): Promise<Partial<TranslatedVenueDetails>> {
    const enrichers =
      this.config?.enrichers?.map((enricher) =>
        enricher.getEnrichments(data, context)
      ) ?? [];
    const enrichmentDataArray = await Promise.all(enrichers);
    return enrichmentDataArray.reduce(
      (acc, data) => ({
        ...acc,
        ...data,
      }),
      {}
    );
  }

  async processData(data: I, context: VenueContext) {
    return {
      ...this.format(data, context),
      ...(await this.enrich(data, context)),
    };
  }

  async execute(id: string, source: Source, context: VenueContext) {
    return this.getDataSource(id, source, context).then((data) =>
      this.processData(data, context)
    );
  }
}
