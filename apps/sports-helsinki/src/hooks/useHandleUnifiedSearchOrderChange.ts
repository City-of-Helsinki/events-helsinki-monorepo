import {
  UnifiedSearchOrderBy,
  isAccessibilityProfile,
  useGeolocation,
} from '@events-helsinki/components';
import type {
  UnifiedSearchOrderByType,
  OrderDirType,
  GeolocationContextType,
  Coordinates,
  Option,
} from '@events-helsinki/components';
import { useCallback } from 'react';
import { useCombinedSearchContext } from '../domain/search/combinedSearch/adapters/CombinedSearchContext';

const useHandleUnifiedSearchOrderChange = () => {
  const geolocation: GeolocationContextType = useGeolocation();
  const {
    setFormValues,
    updateRouteToSearchPage,
    formValues: { accessibilityProfile },
  } = useCombinedSearchContext();

  // Provide a callback for onChange-handler
  return useCallback(
    async (option: Option) => {
      const [orderBy, orderDir] = option.value.split('-') as [
        UnifiedSearchOrderByType,
        OrderDirType,
      ];
      if (isAccessibilityProfile(option.value)) {
        // Update the combined search form context
        setFormValues({
          venueOrderBy: option.value,
        });
      } else {
        // If the user wants to order by distance, try and resolve geolocation
        if (orderBy === UnifiedSearchOrderBy.distance) {
          let location: Coordinates | null = geolocation.coordinates;

          if (!geolocation.called || !geolocation.coordinates) {
            // Wait until position is resolved. This defers querying search
            // results until location is resolved, which will result in less UI
            // states and a slightly better UX.
            location = await geolocation.resolve();
          }

          // If location could not be found, return early and do not change
          // ordering.
          if (!location) {
            return null;
          }
        }

        // Update the combined search form context
        setFormValues({
          venueOrderBy: orderDir === 'desc' ? `-${orderBy}` : orderBy,
        });
      }
      // Update the URL
      updateRouteToSearchPage({ shallow: true });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [geolocation, accessibilityProfile]
  );
};

export default useHandleUnifiedSearchOrderChange;
