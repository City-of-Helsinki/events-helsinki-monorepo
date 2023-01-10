import type {
  OrderByType,
  OrderDirType,
  ModifyFilters,
} from 'events-helsinki-components';
import {
  OrderBy,
  OrderDir,
  useSearchTranslation,
  useUnifiedSearch,
} from 'events-helsinki-components';
import Select from 'events-helsinki-components/components/select/Select';
import SmallSpinner from 'events-helsinki-components/components/spinner/SmallSpinner';
import type { GeolocationContextType } from 'events-helsinki-components/geolocation/GeolocationProvider';
import useGeolocation from 'events-helsinki-components/geolocation/useGeolocation';
import type { Coordinates } from 'events-helsinki-components/types';
import React, { useCallback } from 'react';
import type { Option } from '../../../nextApi/types';
import styles from './orderBySelect.module.scss';

const handleOrderChange = async (
  option: Option,
  geolocation: GeolocationContextType,
  modifyFilters: ModifyFilters
) => {
  const transitionOptions = {
    shallow: true,
  };
  const [by, dir] = option.value.split('-') as [OrderByType, OrderDirType];

  // If the user wants to order by distance, try and resolve geolocation
  if (by === OrderBy.distance) {
    let location: Coordinates | null = geolocation.coordinates;

    if (!geolocation.called || !geolocation.coordinates) {
      // Wait until position is resolved. This defers querying search
      // results until location is resolved, which will result in less UI
      // states and a slightly better UX.
      // location = await geolocation.resolve();
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
};

const OrderBySelect: React.FC = () => {
  const { t } = useSearchTranslation();
  const { filters, modifyFilters } = useUnifiedSearch();
  const geolocation: GeolocationContextType = useGeolocation({ skip: true });

  const handleOrderChangeCallback = useCallback(
    (option: Option) => {
      handleOrderChange(option, geolocation, modifyFilters);
    },
    [geolocation, modifyFilters]
  );

  const defaultOption = {
    label: t('search:order_by.alphabetical'),
    value: `${OrderBy.name}-${OrderDir.asc}`,
  };
  const orderByOptions = [
    defaultOption,
    {
      label: t('search:order_by.relevance'),
      value: `${OrderBy.relevance}-${OrderDir.asc}`,
    },
    {
      label: t('search:order_by.distance'),
      value: `${OrderBy.distance}-${OrderDir.asc}`,
    },
  ];
  const selectedOrderByOption = orderByOptions.find((option) => {
    const selectedOptionValue = `${filters.orderBy ?? ''}-${
      filters.orderDir ?? OrderDir.asc
    }`;

    return option.value === selectedOptionValue;
  });

  return (
    <Select
      label={t('search:order_by.label')}
      value={selectedOrderByOption ?? defaultOption}
      onChange={handleOrderChangeCallback}
      options={orderByOptions}
      icon={geolocation.loading ? <SmallSpinner /> : null}
      noOutline
      className={styles.orderBySelect}
    />
  );
};

export default OrderBySelect;
