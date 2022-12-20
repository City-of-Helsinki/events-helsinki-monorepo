import type { AnyObject, Context } from '../../../nextApi/types';

export default interface VenueEnricher<I = AnyObject, O = AnyObject> {
  getEnrichments(data: I, context: Context): Promise<Partial<O>>;
}
