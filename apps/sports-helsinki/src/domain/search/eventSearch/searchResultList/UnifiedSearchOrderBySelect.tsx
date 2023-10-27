import {
  UnifiedSearchOrderBy,
  OrderDir,
  useSearchTranslation,
  Select,
  SmallSpinner,
  useGeolocation,
  isAccessibilityProfile,
} from '@events-helsinki/components';
import type {
  GeolocationContextType,
  Option,
} from '@events-helsinki/components';
import type { SelectCustomTheme } from 'hds-react';
import React from 'react';
import useHandleUnifiedSearchOrderChange from '../../../../hooks/useHandleUnifiedSearchOrderChange';
import { useCombinedSearchContext } from '../../combinedSearch/adapters/CombinedSearchContext';
import styles from './unifiedSearchOrderBySelect.module.scss';

const useUnifiedSearchOrderBySelectOptions = () => {
  const { t } = useSearchTranslation();
  const {
    formValues: { accessibilityProfile },
  } = useCombinedSearchContext();

  const defaultOption: Option = {
    text: t('search:orderBy.relevance'),
    value: `${UnifiedSearchOrderBy.relevance}-${OrderDir.asc}`,
  };

  const orderByOptions: Option[] = [
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

  // Add the accessibilityProfileOption only when an accessibilityShortcoming filter is selected.
  if (accessibilityProfile) {
    // The accessibility profile ordering option is "synced" to the accessibilityShortcoming-filter-selection.
    orderByOptions.push({
      text: t('search:orderBy.accessibility'),
      value: accessibilityProfile,
    });
  }

  return { orderByOptions, defaultOption };
};

const UnifiedSearchOrderBySelect: React.FC = () => {
  const { t } = useSearchTranslation();
  const {
    formValues: { venueOrderBy },
  } = useCombinedSearchContext();
  const geolocation: GeolocationContextType = useGeolocation();
  const handleUnifiedSearchOrderChange = useHandleUnifiedSearchOrderChange();
  const { orderByOptions, defaultOption } =
    useUnifiedSearchOrderBySelectOptions();

  const selectedOrderByOption = React.useMemo(
    () =>
      orderByOptions.find((option) => {
        if (venueOrderBy) {
          if (isAccessibilityProfile(venueOrderBy)) {
            return option.value === venueOrderBy;
          }
          const selectedOptionValue = `${venueOrderBy}-${
            venueOrderBy?.startsWith('-') ? OrderDir.desc : OrderDir.asc
          }`;
          return option.value === selectedOptionValue;
        }
      }),
    [orderByOptions, venueOrderBy]
  );

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
      className={styles.unifiedSearchOrderBySelect}
    />
  );
};

export default UnifiedSearchOrderBySelect;
