import {
  useLocale,
  PublisherFilter,
  FilterButton,
  translateValue,
  PlaceFilter,
} from '@events-helsinki/components';
import { IconCrossCircleFill } from 'hds-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { ROUTES } from '../../../../constants';
import routerHelper from '../../../../domain/app/routerHelper';
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
    organization: publisher,
    text: q,
    place,
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

    router.push({
      pathname: routerHelper.getI18nPath(ROUTES.SEARCH, locale),
      query,
    });
  };

  const hasFilters =
    !!sportsCategories.length ||
    !!targetGroups.length ||
    !!publisher ||
    !!place ||
    !!q?.length;

  if (!hasFilters) return null;

  return (
    <div
      className={styles.filterSummary}
      data-testid={filterSummaryContainerTestId}
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
          type="sportsCategory"
          value={sportsCategory}
        />
      ))}
      {targetGroups.map((targetGroup) => (
        <FilterButton
          key={targetGroup}
          onRemove={() => handleFilterRemove('targetGroups', targetGroup)}
          text={translateValue('appSports:home.targetGroup.', targetGroup, t)}
          type="targetGroup"
          value={targetGroup}
        />
      ))}
      {publisher && (
        <PublisherFilter
          id={publisher}
          onRemove={() => handleFilterRemove('organization', publisher)}
        />
      )}
      {place && (
        <PlaceFilter
          key={place}
          id={place}
          onRemove={() => handleFilterRemove('place', place)}
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
