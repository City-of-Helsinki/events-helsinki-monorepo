import type VenueContext from '../../context/VenueContext.js';

export default interface VenueEnricher<I, O> {
  getEnrichments(data: I, context: VenueContext): Promise<O>;
}
