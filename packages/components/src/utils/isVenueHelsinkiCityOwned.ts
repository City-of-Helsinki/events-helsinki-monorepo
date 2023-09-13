import {
  isUnifiedSearchVenue,
  isVenue,
  ProviderType,
  ServiceOwnerType,
} from '../types';
import type { UnifiedSearchVenue, Venue } from '../types';

/**
 * Check is venue owned by City of Helsinki
 * @param venue
 * @return {boolean}
 */
export default function isVenueHelsinkiCityOwned(
  venue: UnifiedSearchVenue | Venue
): boolean {
  if (isUnifiedSearchVenue(venue)) {
    return (
      venue.serviceOwner?.providerType == ProviderType.SelfProduced &&
      venue.serviceOwner?.type == ServiceOwnerType.MunicipalService
    );
  } else if (isVenue(venue)) {
    return (
      venue.providerType == ProviderType.SelfProduced &&
      venue.displayedServiceOwnerType == ServiceOwnerType.MunicipalService
    );
  }
  throw new Error('Invalid venue type for isVenueHelsinkiCityOwned');
}
