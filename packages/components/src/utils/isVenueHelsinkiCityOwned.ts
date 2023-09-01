import { ProviderType, ServiceOwnerType } from '../types';
import type { UnifiedSearchVenue, Venue } from '../types';

/**
 * Check is venue owned by City of Helsinki
 * @param venue
 * @return {boolean}
 */
export default function isVenueHelsinkiCityOwned(
  venue: UnifiedSearchVenue | Venue
): boolean {
  if (venue.__typename == 'UnifiedSearchVenue') {
    return (
      venue.serviceOwner?.providerType == ProviderType.SelfProduced &&
      venue.serviceOwner?.type == ServiceOwnerType.MunicipalService
    );
  } else if (venue.__typename == 'Venue') {
    return (
      venue.providerType == ProviderType.SelfProduced &&
      venue.displayedServiceOwnerType == ServiceOwnerType.MunicipalService
    );
  }
  throw Error(`Unsupported venue type ${venue.__typename}`);
}
