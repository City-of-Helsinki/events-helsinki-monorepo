import {
  UnifiedSearchOrderBy,
  OrderDir,
  useSearchTranslation,
  useUnifiedSearch,
  Select,
  SmallSpinner,
  useGeolocation,
} from '@events-helsinki/components';
import type { GeolocationContextType } from '@events-helsinki/components';
import type { SelectCustomTheme } from 'hds-react';
import React from 'react';
import useHandleUnifiedSearchOrderChange from '../../../../hooks/useHandleUnifiedSearchOrderChange';
import styles from './unifiedSearchOrderBySelect.module.scss';

const UnifiedSearchOrderBySelect: React.FC = () => {
  const { t } = useSearchTranslation();
  const { filters } = useUnifiedSearch();
  const geolocation: GeolocationContextType = useGeolocation({ skip: true });
  const handleUnifiedSearchOrderChange = useHandleUnifiedSearchOrderChange();

  const defaultOption = {
    text: t('search:orderBy.relevance'),
    value: `${UnifiedSearchOrderBy.relevance}-${OrderDir.asc}`,
  };
  const orderByOptions = [
    {
      text: t('search:orderBy.alphabetical'),
      value: `${UnifiedSearchOrderBy.name}-${OrderDir.asc}`,
    },
    defaultOption,
    {
      text: t('search:orderBy.distance'),
      value: `${UnifiedSearchOrderBy.distance}-${OrderDir.asc}`,
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
      theme={
        {
          '--menu-item-background': 'var(--color-input-dark)',
          '--menu-item-background-hover': 'var(--color-input-dark)',
          '--menu-item-background-selected-hover': 'var(--color-input-dark)',
        } as SelectCustomTheme
      }
      label={t('search:orderBy.label')}
      value={selectedOrderByOption ?? defaultOption}
      onChange={handleUnifiedSearchOrderChange}
      options={orderByOptions}
      icon={geolocation.loading ? <SmallSpinner /> : null}
      noOutline
      className={styles.unifiedSearchOrderBySelect}
    />
  );
};

export default UnifiedSearchOrderBySelect;
