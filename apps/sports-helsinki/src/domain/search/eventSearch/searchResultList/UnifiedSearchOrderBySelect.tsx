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

const UnifiedSearchOrderBySelect: React.FC = () => {
  const { t } = useSearchTranslation();
  const {
    formValues: { venueOrderBy, accessibilityProfile },
  } = useCombinedSearchContext();
  const geolocation: GeolocationContextType = useGeolocation({ skip: true });
  const handleUnifiedSearchOrderChange = useHandleUnifiedSearchOrderChange();

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

  const selectedOrderByOption = React.useMemo(
    () =>
      orderByOptions.find((option) => {
        // If accessbility profile search-filter is used,
        // the order by value is fixed to the value of the accessibilityProfile.
        if (
          accessibilityProfile &&
          isAccessibilityProfile(accessibilityProfile)
        ) {
          return option.value === accessibilityProfile;
        }
        // Otherwise, use the venueOrderBy-parameter to select an order by option
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accessibilityProfile, venueOrderBy]
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
