import type { ParsedUrlQueryInput } from 'querystring';
import type { FilterType } from '@events-helsinki/components';
import {
  DateFilter,
  PlaceFilter,
  PublisherFilter,
  formatDate,
  translateValue,
  FilterButton,
  useLocale,
  HelsinkiOnlyFilter,
  EVENT_SEARCH_FILTERS,
} from '@events-helsinki/components';
import { IconCrossCircleFill } from 'hds-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import queryString from 'query-string';
import React from 'react';

import { ROUTES } from '../../../../constants';
import routerHelper from '../../../../domain/app/routerHelper';
import { getSearchFilters, getSearchQuery } from '../utils';
import styles from './filterSummary.module.scss';

export const filterSummaryContainerTestId = 'filter-summary';

interface Props {
  onClear: () => void;
}

const FilterSummary: React.FC<Props> = ({ onClear }) => {
  const { t } = useTranslation('search');
  const locale = useLocale();
  const router = useRouter();
  const searchParams = new URLSearchParams(queryString.stringify(router.query));
  const {
    [EVENT_SEARCH_FILTERS.CATEGORIES]: categories,
    [EVENT_SEARCH_FILTERS.DATE_TYPES]: dateTypes,
    [EVENT_SEARCH_FILTERS.END]: end,
    [EVENT_SEARCH_FILTERS.HELSINKI_ONLY]: helsinkiOnly,
    [EVENT_SEARCH_FILTERS.IS_FREE]: isFree,
    [EVENT_SEARCH_FILTERS.KEYWORD]: keyword,
    [EVENT_SEARCH_FILTERS.KEYWORD_NOT]: keywordNot,
    [EVENT_SEARCH_FILTERS.PLACES]: places,
    [EVENT_SEARCH_FILTERS.PUBLISHER]: publisher,
    [EVENT_SEARCH_FILTERS.START]: start,
    [EVENT_SEARCH_FILTERS.TEXT]: text,
    [EVENT_SEARCH_FILTERS.TARGET_AGE_GROUP]: targetAgeGroup,
  } = getSearchFilters(searchParams);

  let dateText = '';
  if (start || end) {
    const startDate = start ? formatDate(start) : '';
    const endDate = end ? formatDate(end) : '';
    dateText = `${startDate} - ${endDate}`.trim();
  }

  const handleFilterRemove = (value: string | number, type: FilterType) => {
    const getFilteredList = (listType: FilterType, list: string[] = []) =>
      type === listType ? list.filter((v) => v !== value) : list;

    const search = getSearchQuery({
      [EVENT_SEARCH_FILTERS.CATEGORIES]: getFilteredList(
        'category',
        categories
      ),
      [EVENT_SEARCH_FILTERS.DATE_TYPES]: getFilteredList('dateType', dateTypes),
      [EVENT_SEARCH_FILTERS.END]: type === 'date' ? null : end,
      [EVENT_SEARCH_FILTERS.HELSINKI_ONLY]:
        type === 'helsinkiOnly' ? undefined : helsinkiOnly,
      [EVENT_SEARCH_FILTERS.IS_FREE]: isFree,
      [EVENT_SEARCH_FILTERS.KEYWORD]: keyword,
      [EVENT_SEARCH_FILTERS.KEYWORD_NOT]: keywordNot,
      [EVENT_SEARCH_FILTERS.PLACES]: getFilteredList('place', places),
      [EVENT_SEARCH_FILTERS.PUBLISHER]: type !== 'publisher' ? publisher : null,
      [EVENT_SEARCH_FILTERS.START]: type === 'date' ? null : start,
      [EVENT_SEARCH_FILTERS.TEXT]: getFilteredList('text', text),
      [EVENT_SEARCH_FILTERS.TARGET_AGE_GROUP]:
        type !== 'targetAgeGroup' ? targetAgeGroup : undefined,
    });

    router.push({
      pathname: routerHelper.getI18nPath(ROUTES.SEARCH, locale),
      query: queryString.parse(search) as ParsedUrlQueryInput,
    });
  };

  const hasFilters =
    !!helsinkiOnly ||
    !!publisher ||
    !!categories.length ||
    !!dateText ||
    !!dateTypes.length ||
    !!places.length ||
    !!text?.length ||
    !!targetAgeGroup;

  if (!hasFilters) return null;

  return (
    <div
      className={styles.filterSummary}
      data-testid={filterSummaryContainerTestId}
    >
      {helsinkiOnly && <HelsinkiOnlyFilter onRemove={handleFilterRemove} />}
      {categories.map((category) => (
        <FilterButton
          key={category}
          onRemove={handleFilterRemove}
          text={translateValue('home:category.', category, t)}
          type="category"
          value={category}
        />
      ))}
      {targetAgeGroup && (
        <FilterButton
          key={targetAgeGroup}
          onRemove={handleFilterRemove}
          text={translateValue('search.targetAgeGroup.', targetAgeGroup, t)}
          type="targetAgeGroup"
          value={targetAgeGroup ?? ''}
        />
      )}
      {publisher && (
        <PublisherFilter id={publisher} onRemove={handleFilterRemove} />
      )}
      {places.map((place) => (
        <PlaceFilter key={place} id={place} onRemove={handleFilterRemove} />
      ))}

      {dateText && (
        <DateFilter
          onRemove={handleFilterRemove}
          text={dateText}
          type="date"
          value="date"
        />
      )}
      {dateTypes.map((dateType) => (
        <DateFilter
          key={dateType}
          onRemove={handleFilterRemove}
          type="dateType"
          value={dateType}
        />
      ))}
      <button className={styles.clearButton} onClick={onClear} type="button">
        {t('buttonClearFilters')}
        <IconCrossCircleFill aria-hidden />
      </button>
    </div>
  );
};

export default FilterSummary;
