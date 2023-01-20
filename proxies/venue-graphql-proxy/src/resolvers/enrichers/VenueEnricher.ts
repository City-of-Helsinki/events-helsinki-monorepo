import type VenueContext from '../../context/VenueContext';

export default interface VenueEnricher<I, O> {
  getEnrichments(data: I, context: VenueContext): Promise<Partial<O>>;
}
