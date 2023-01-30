import type { ParsedUrlQueryInput } from 'querystring';
import type { FilterType } from 'events-helsinki-components';
import {
  useLocale,
  PlaceFilter,
  PublisherFilter,
} from 'events-helsinki-components';
import { IconCrossCircleFill } from 'hds-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import qs, { parse } from 'query-string';
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
  const searchParams = new URLSearchParams(qs.stringify(router.query));
  const {
    dateTypes,
    end,
    keyword,
    keywordNot,
    places,
    publisher,
    start,
    text,
    eventType,
  } = getSearchFilters(searchParams);

  const handleFilterRemove = (value: string | number, type: FilterType) => {
    const getFilteredList = (listType: FilterType, list: string[] = []) =>
      type === listType ? list.filter((v) => v !== value) : list;

    const search = getSearchQuery({
      dateTypes,
      eventType,
      end: type === 'date' ? null : end,
      keyword,
      keywordNot,
      places: getFilteredList('place', places),
      publisher: type !== 'publisher' ? publisher : null,
      start: type === 'date' ? null : start,
      text: getFilteredList('text', text),
    });

    router.push({
      pathname: routerHelper.getI18nPath(ROUTES.SEARCH, locale),
      query: parse(search) as ParsedUrlQueryInput,
    });
  };

  const hasFilters = !!publisher || !!places.length || !!text?.length;

  if (!hasFilters) return null;

  return (
    <div
      className={styles.filterSummary}
      data-testid={filterSummaryContainerTestId}
    >
      {publisher && (
        <PublisherFilter id={publisher} onRemove={handleFilterRemove} />
      )}
      {places.map((place) => (
        <PlaceFilter key={place} id={place} onRemove={handleFilterRemove} />
      ))}

      <button className={styles.clearButton} onClick={onClear} type="button">
        {t('buttonClearFilters')}
        <IconCrossCircleFill aria-hidden />
      </button>
    </div>
  );
};

export default FilterSummary;
