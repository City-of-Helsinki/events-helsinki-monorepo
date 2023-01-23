import {
  UnifiedSearchOrderBy,
  useGeolocation,
  useUnifiedSearch,
} from 'events-helsinki-components';
import type {
  UnifiedSearchOrderByType,
  OrderDirType,
  GeolocationContextType,
  Coordinates,
  Option,
} from 'events-helsinki-components';
import { useCallback } from 'react';

const useHandleUnifiedSearchOrderChange = () => {
  const { modifyFilters } = useUnifiedSearch();
  const geolocation: GeolocationContextType = useGeolocation({ skip: true });

  return useCallback(
    async (option: Option) => {
      const transitionOptions = { shallow: true };
      const [by, dir] = option.value.split('-') as [
        UnifiedSearchOrderByType,
        OrderDirType
      ];

      // If the user wants to order by distance, try and resolve geolocation
      if (by === UnifiedSearchOrderBy.distance) {
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

      return modifyFilters(
        {
          orderBy: by,
          orderDir: dir,
        },
        transitionOptions
      );
    },
    [geolocation, modifyFilters]
  );
};

export default useHandleUnifiedSearchOrderChange;
