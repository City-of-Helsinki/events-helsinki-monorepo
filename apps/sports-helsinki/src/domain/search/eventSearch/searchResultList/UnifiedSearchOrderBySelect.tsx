import {
  UnifiedSearchOrderBy,
  OrderDir,
  useSearchTranslation,
  Select,
  useGeolocation,
  isAccessibilityProfile,
  LoadingSpinner,
} from '@events-helsinki/components';
import type { GeolocationContextType } from '@events-helsinki/components';
import type { Option } from 'hds-react';
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
    label: t('search:orderBy.relevance'),
    value: `${UnifiedSearchOrderBy.relevance}-${OrderDir.asc}`,
    selected: false,
    isGroupLabel: false,
    visible: true,
    disabled: false,
  };

  const orderByOptions: Option[] = [
    {
      label: t('search:orderBy.alphabetical'),
      value: `${UnifiedSearchOrderBy.name}-${OrderDir.asc}`,
      selected: false,
      isGroupLabel: false,
      visible: true,
      disabled: false,
    },
    defaultOption,
    {
      label: t('search:orderBy.distance'),
      value: `${UnifiedSearchOrderBy.distance}-${OrderDir.asc}`,
      selected: false,
      isGroupLabel: false,
      visible: true,
      disabled: false,
    },
  ];

  // Add the accessibilityProfileOption only when an accessibilityShortcoming filter is selected.
  if (accessibilityProfile) {
    // The accessibility profile ordering option is "synced" to the accessibilityShortcoming-filter-selection.
    orderByOptions.push({
      label: t('search:orderBy.accessibility'),
      value: accessibilityProfile,
      selected: false,
      isGroupLabel: false,
      visible: false,
      disabled: false,
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
      theme={{
        '--checkbox-background-selected': 'var(--color-input-dark)',
        '--checkbox-background-hover': 'var(--color-input-dark)',
        '--menu-item-background-color-hover': 'var(--color-input-light)',
        '--menu-item-background-color-selected-hover':
          'var(--color-input-light)',
      }}
      texts={{ label: t('search:orderBy.label') }}
      value={selectedOrderByOption?.value ?? defaultOption.value}
      onChange={handleUnifiedSearchOrderChange}
      options={orderByOptions}
      icon={
        geolocation.loading ? (
          <LoadingSpinner
            isLoading
            small
            multicolor={false}
            hasPadding={false}
            theme={{ '--spinner-color': 'var(--color-black)' }}
          />
        ) : null
      }
      className={styles.unifiedSearchOrderBySelect}
    />
  );
};

export default UnifiedSearchOrderBySelect;
