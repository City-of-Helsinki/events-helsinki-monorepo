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
} from '@events-helsinki/components';
import type { Option } from 'hds-react';
import { useCallback } from 'react';
import { useCombinedSearchContext } from '../domain/search/combinedSearch/adapters/CombinedSearchContext';

const useHandleUnifiedSearchOrderChange = () => {
  const geolocation: GeolocationContextType = useGeolocation();
  const {
    setFormValues,
    updateRouteToSearchPage,
    formValues: { accessibilityProfile },
  } = useCombinedSearchContext();

  // Return a synchronous callback
  return useCallback(
    (_selectedOptions: Option[], option: Option) => {
      const [orderBy, orderDir] = option.value.split('-') as [
        UnifiedSearchOrderByType,
        OrderDirType,
      ];

      const handleSelectionLogic = async () => {
        if (isAccessibilityProfile(option.value)) {
          setFormValues({
            venueOrderBy: option.value,
          });
        } else {
          // If sorting by distance, handle geolocation resolution
          if (orderBy === UnifiedSearchOrderBy.distance) {
            let location: Coordinates | null = geolocation.coordinates;

            if (!geolocation.called || !geolocation.coordinates) {
              try {
                // This is the blocking part
                location = await geolocation.resolve();
              } catch (e) {
                // Handle permission denial or timeout here
                // eslint-disable-next-line no-console
                console.error('Failed to resolve location', e);
                return;
              }
            }

            if (!location) {
              return;
            }
          }

          setFormValues({
            venueOrderBy: orderDir === 'desc' ? `-${orderBy}` : orderBy,
          });
        }

        // Update URL after logic is complete
        updateRouteToSearchPage({ shallow: true });
      };

      // Execute the logic immediately.
      // The outer callback returns 'void' immediately, satisfying the UI component.
      handleSelectionLogic().catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error in search order change handler:', error);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [geolocation, accessibilityProfile]
  );
};

export default useHandleUnifiedSearchOrderChange;
