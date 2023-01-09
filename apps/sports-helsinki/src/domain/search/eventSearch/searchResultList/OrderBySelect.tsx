import {
  OrderBy,
  OrderDir,
  useSearchTranslation,
  useUnifiedSearch,
  Select,
  SmallSpinner,
  useGeolocation,
} from 'events-helsinki-components';
import type { GeolocationContextType } from 'events-helsinki-components';
import React from 'react';
import useHandleOrderChange from '../../../../hooks/useHandleOrderChange';
import styles from './orderBySelect.module.scss';

const OrderBySelect: React.FC = () => {
  const { t } = useSearchTranslation();
  const { filters } = useUnifiedSearch();
  const geolocation: GeolocationContextType = useGeolocation({ skip: true });
  const handleOrderChange = useHandleOrderChange();

  const defaultOption = {
    text: t('search:orderBy.alphabetical'),
    value: `${OrderBy.name}-${OrderDir.asc}`,
  };
  const orderByOptions = [
    defaultOption,
    {
      text: t('search:orderBy.relevance'),
      value: `${OrderBy.relevance}-${OrderDir.asc}`,
    },
    {
      text: t('search:orderBy.distance'),
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
      label={t('search:orderBy.label')}
      value={selectedOrderByOption ?? defaultOption}
      onChange={handleOrderChange}
      options={orderByOptions}
      icon={geolocation.loading ? <SmallSpinner /> : null}
      noOutline
      className={styles.orderBySelect}
    />
  );
};

export default OrderBySelect;
