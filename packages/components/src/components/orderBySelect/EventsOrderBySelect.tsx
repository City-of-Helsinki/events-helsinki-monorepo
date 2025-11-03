import type { SelectCustomTheme } from 'hds-react';
import { useRouter } from 'next/router';
import React from 'react';
import {
  DEFAULT_EVENT_SORT_OPTION,
  EVENT_SORT_OPTIONS,
} from '../../constants/event-constants';
import useSearchTranslation from '../../hooks/useSearchTranslation';
import useSetSortQueryParamToOptionValue from '../../hooks/useSetSortQueryParamToOptionValue';
import type { Option } from '../../types/types';
import Select from '../select/Select';
import styles from './eventsOrderBySelect.module.scss';

const EventsOrderBySelect: React.FC<{
  sortParameter?: string;
  customOnChangeHandler?: (option: Option) => void;
}> = ({ sortParameter = 'sort', customOnChangeHandler }) => {
  const { t } = useSearchTranslation();
  const router = useRouter();
  const sort = router.query?.[sortParameter] ?? DEFAULT_EVENT_SORT_OPTION;
  const setSortQueryParamToOptionValue = useSetSortQueryParamToOptionValue();

  const orderByOptions = [
    {
      text: t('search:orderBy.endTime'),
      value: EVENT_SORT_OPTIONS.END_TIME,
    },
    {
      text: t('search:orderBy.relevance'),
      value: EVENT_SORT_OPTIONS.RANK_DESC,
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
      theme={
        {
          '--menu-item-background': 'var(--color-input-dark)',
          '--menu-item-background-hover': 'var(--color-input-dark)',
          '--menu-item-background-selected-hover': 'var(--color-input-dark)',
        } as SelectCustomTheme
      }
      label={t('search:orderBy.label')}
      value={selectedOrderByOption ?? defaultOption}
      onChange={customOnChangeHandler ?? setSortQueryParamToOptionValue}
      options={orderByOptions}
      className={styles.eventsOrderBySelect}
    />
  );
};

export default EventsOrderBySelect;
