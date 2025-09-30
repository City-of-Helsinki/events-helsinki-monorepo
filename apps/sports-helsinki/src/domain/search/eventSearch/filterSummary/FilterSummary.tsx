import {
  useLocale,
  HelsinkiOnlyFilter,
  ReservableFilter,
  OrganizationFilter,
  FilterButton,
  translateValue,
  PlaceFilter,
  AccessibilityFilter,
} from '@events-helsinki/components';
import { IconCrossCircleFill } from 'hds-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { ROUTES } from '../../../../constants';
import routerHelper from '../../../../domain/app/routerHelper';
import { PARAM_SEARCH_TYPE } from '../../../../domain/search/combinedSearch/constants';
import { useCombinedSearchContext } from '../../../search/combinedSearch/adapters/CombinedSearchContext';
import type { CombinedSearchAdapterInput } from '../../../search/combinedSearch/types';
import styles from './filterSummary.module.scss';

export const filterSummaryContainerTestId = 'filter-summary';

interface Props {
  onClear: () => void;
}

const FilterSummary: React.FC<Props> = ({ onClear }) => {
  const { t } = useTranslation('search');
  const locale = useLocale();
  const router = useRouter();
  const { formValues } = useCombinedSearchContext();
  const {
    sportsCategories,
    targetGroups,
    organization,
    helsinkiOnly,
    reservable,
    text,
    place,
    accessibilityProfile,
  } = formValues;

  const handleFilterRemove = (
    type: keyof CombinedSearchAdapterInput,
    value: string | number
  ) => {
    const getFilteredValue = (
      type: keyof CombinedSearchAdapterInput,
      value: string | number
    ) => {
      if (Array.isArray(formValues[type])) {
        return (formValues[type] as string[])?.filter(
          (entry) => (entry as string) !== (value as string)
        );
      }
      return undefined;
    };

    const query: CombinedSearchAdapterInput = {
      ...formValues,
      [type]: getFilteredValue(type, value),
    };

    const searchParams = new URLSearchParams(router.asPath.split('?')[1]);
    const searchTypeParam = searchParams.get(PARAM_SEARCH_TYPE);

    router.push({
      pathname: routerHelper.getI18nPath(ROUTES.SEARCH, locale),
      query: { ...query, searchType: searchTypeParam },
    });
  };

  const hasFilters =
    !!sportsCategories.length ||
    !!targetGroups.length ||
    !!helsinkiOnly ||
    !!reservable ||
    !!organization ||
    !!place ||
    !!accessibilityProfile ||
    !!text?.length;

  if (!hasFilters) return null;

  return (
    <div
      className={styles.filterSummary}
      data-testid={filterSummaryContainerTestId}
      aria-live="polite"
      aria-atomic="true"
      role="status"
    >
      {sportsCategories.map((sportsCategory) => (
        <FilterButton
          key={sportsCategory}
          onRemove={() =>
            handleFilterRemove('sportsCategories', sportsCategory)
          }
          text={translateValue(
            'appSports:home.sportsCategory.',
            sportsCategory,
            t
          )}
          type="sportsCategories"
          value={sportsCategory}
          aria-labelledby="sportsCategory"
        />
      ))}
      {targetGroups.map((targetGroup) => (
        <FilterButton
          key={targetGroup}
          onRemove={() => handleFilterRemove('targetGroups', targetGroup)}
          text={translateValue('appSports:home.targetGroup.', targetGroup, t)}
          type="targetGroups"
          value={targetGroup}
          aria-labelledby="targetGroup"
        />
      ))}
      {organization && (
        <OrganizationFilter
          id={organization}
          onRemove={() => handleFilterRemove('organization', organization)}
        />
      )}
      {helsinkiOnly && (
        <HelsinkiOnlyFilter
          onRemove={() => handleFilterRemove('helsinkiOnly', 'true')}
        />
      )}
      {reservable && (
        <ReservableFilter
          onRemove={() => handleFilterRemove('reservable', 'true')}
        />
      )}
      {place && (
        <PlaceFilter
          key={place}
          id={place}
          onRemove={() => handleFilterRemove('place', place)}
        />
      )}
      {accessibilityProfile && (
        <AccessibilityFilter
          id={accessibilityProfile}
          onRemove={() =>
            handleFilterRemove('accessibilityProfile', accessibilityProfile)
          }
          aria-labelledby="accessibilityProfile"
        />
      )}
      <button className={styles.clearButton} onClick={onClear} type="button">
        {t('buttonClearFilters')}
        <IconCrossCircleFill aria-hidden />
      </button>
    </div>
  );
};

export default FilterSummary;
