import type { Context } from '../types';

export default interface VenueEnricher<I, O> {
  getEnrichments(data: I, context: Context): Promise<Partial<O>>;
}
