import { Select, useSearchTranslation } from 'events-helsinki-components';
import { useRouter } from 'next/router';
import React from 'react';
import useSetSortQueryParamToOptionValue from '../../../../hooks/useSetSortQueryParamToOptionValue';
import { DEFAULT_EVENT_SORT_OPTION, EVENT_SORT_OPTIONS } from '../constants';
import styles from './eventsOrderBySelect.module.scss';

const EventsOrderBySelect: React.FC = () => {
  const { t } = useSearchTranslation();
  const router = useRouter();
  const sort = router.query?.sort ?? DEFAULT_EVENT_SORT_OPTION;
  const setSortQueryParamToOptionValue = useSetSortQueryParamToOptionValue();

  const orderByOptions = [
    {
      text: t('search:orderBy.endTime'),
      value: EVENT_SORT_OPTIONS.END_TIME,
    },
    {
      text: t('search:orderBy.lastModifiedTime'),
      value: EVENT_SORT_OPTIONS.LAST_MODIFIED_TIME_DESC,
    },
    {
      text: t('search:orderBy.startTime'),
      value: EVENT_SORT_OPTIONS.START_TIME,
    },
  ];
  const defaultOption = orderByOptions.find((option) => {
    return option.value === DEFAULT_EVENT_SORT_OPTION;
  });
  const selectedOrderByOption = orderByOptions.find((option) => {
    return option.value === sort;
  });

  return (
    <Select
      label={t('search:orderBy.label')}
      value={selectedOrderByOption ?? defaultOption}
      onChange={setSortQueryParamToOptionValue}
      options={orderByOptions}
      noOutline
      className={styles.eventsOrderBySelect}
    />
  );
};

export default EventsOrderBySelect;
