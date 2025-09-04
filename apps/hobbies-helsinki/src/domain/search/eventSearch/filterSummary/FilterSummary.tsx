import type { ParsedUrlQueryInput } from 'querystring';
import type { FilterType } from '@events-helsinki/components';
import {
  AgeFilter,
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
import routerHelper from '../../../app/routerHelper';
import {
  getSearchFilters,
  getSearchQuery,
  getSuitableForFilterValue,
} from '../utils';
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
    [EVENT_SEARCH_FILTERS.HOBBY_TYPES]: hobbyTypes,
    [EVENT_SEARCH_FILTERS.DATE_TYPES]: dateTypes,
    [EVENT_SEARCH_FILTERS.END]: end,
    [EVENT_SEARCH_FILTERS.HELSINKI_ONLY]: helsinkiOnly,
    [EVENT_SEARCH_FILTERS.IS_FREE]: isFree,
    [EVENT_SEARCH_FILTERS.KEYWORD]: keyword,
    [EVENT_SEARCH_FILTERS.KEYWORD_NOT]: keywordNot,
    [EVENT_SEARCH_FILTERS.ONLY_CHILDREN_EVENTS]: onlyChildrenEvents,
    [EVENT_SEARCH_FILTERS.PLACES]: places,
    [EVENT_SEARCH_FILTERS.MAX_AGE]: publisher,
    [EVENT_SEARCH_FILTERS.START]: start,
    [EVENT_SEARCH_FILTERS.SUITABLE]: suitableFor,
    [EVENT_SEARCH_FILTERS.TEXT]: text,
    [EVENT_SEARCH_FILTERS.MAX_AGE]: audienceMaxAgeGt,
    [EVENT_SEARCH_FILTERS.MIN_AGE]: audienceMinAgeLt,
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
      [EVENT_SEARCH_FILTERS.HOBBY_TYPES]: getFilteredList(
        'hobbyType',
        hobbyTypes
      ),
      [EVENT_SEARCH_FILTERS.DATE_TYPES]: getFilteredList('dateType', dateTypes),
      [EVENT_SEARCH_FILTERS.END]: type === 'date' ? null : end,
      [EVENT_SEARCH_FILTERS.HELSINKI_ONLY]:
        type === 'helsinkiOnly' ? undefined : helsinkiOnly,
      [EVENT_SEARCH_FILTERS.IS_FREE]: isFree,
      [EVENT_SEARCH_FILTERS.KEYWORD]: keyword,
      [EVENT_SEARCH_FILTERS.KEYWORD_NOT]: keywordNot,
      [EVENT_SEARCH_FILTERS.ONLY_CHILDREN_EVENTS]: onlyChildrenEvents,
      [EVENT_SEARCH_FILTERS.PLACES]: getFilteredList('place', places),
      [EVENT_SEARCH_FILTERS.PUBLISHER]: type !== 'publisher' ? publisher : null,
      [EVENT_SEARCH_FILTERS.START]: type === 'date' ? null : start,
      [EVENT_SEARCH_FILTERS.TEXT]: getFilteredList(
        EVENT_SEARCH_FILTERS.TEXT,
        text
      ),
      [EVENT_SEARCH_FILTERS.SUITABLE]:
        getSuitableForFilterValue(suitableFor, type) ?? [],
      [EVENT_SEARCH_FILTERS.MIN_AGE]: type === 'minAge' ? '' : audienceMinAgeLt,
      [EVENT_SEARCH_FILTERS.MAX_AGE]: type === 'maxAge' ? '' : audienceMaxAgeGt,
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
    !!hobbyTypes.length ||
    !!dateText ||
    !!dateTypes.length ||
    !!places.length ||
    !!text?.length ||
    !!suitableFor?.length ||
    !!(audienceMinAgeLt || '').length ||
    !!(audienceMaxAgeGt || '').length;

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
          text={translateValue('home:category.courses.', category, t)}
          type="category"
          value={category}
        />
      ))}
      {hobbyTypes.map((hobbyType) => (
        <FilterButton
          key={hobbyType}
          onRemove={handleFilterRemove}
          text={translateValue('home:hobby.', hobbyType, t)}
          type="hobbyType"
          value={hobbyType}
        />
      ))}
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
      {audienceMinAgeLt && (
        <AgeFilter
          type="minAge"
          value={audienceMinAgeLt}
          onRemove={handleFilterRemove}
        />
      )}
      {audienceMaxAgeGt && (
        <AgeFilter
          type="maxAge"
          value={audienceMaxAgeGt}
          onRemove={handleFilterRemove}
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
