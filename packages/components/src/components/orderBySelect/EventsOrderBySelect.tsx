import type { SelectCustomTheme, Option as HDSOption } from 'hds-react';
import { useRouter } from 'next/router';
import React from 'react';
import {
  DEFAULT_EVENT_SORT_OPTION,
  EVENT_SORT_OPTIONS,
} from '../../constants/event-constants';
import useLocale from '../../hooks/useLocale';
import useSearchTranslation from '../../hooks/useSearchTranslation';
import useSetSortQueryParamToOptionValue from '../../hooks/useSetSortQueryParamToOptionValue';
import Select from '../select/Select';
import styles from './eventsOrderBySelect.module.scss';

function useEventsOrderBySelectOptions(): HDSOption[] {
  const { t } = useSearchTranslation();
  return [
    {
      label: t('search:orderBy.endTime'),
      value: EVENT_SORT_OPTIONS.END_TIME,
      selected: false,
      isGroupLabel: false,
      visible: true,
      disabled: false,
    },
    {
      label: t('search:orderBy.relevance'),
      value: EVENT_SORT_OPTIONS.RANK_DESC,
      selected: false,
      isGroupLabel: false,
      visible: true,
      disabled: false,
    },
    {
      label: t('search:orderBy.startTime'),
      value: EVENT_SORT_OPTIONS.START_TIME,
      selected: false,
      isGroupLabel: false,
      visible: true,
      disabled: false,
    },
  ];
}

const EventsOrderBySelect: React.FC<{
  sortParameter?: string;
  customOnChangeHandler?: (
    _selectedOptions: HDSOption[],
    option: HDSOption
  ) => void;
  theme?: SelectCustomTheme;
}> = ({ sortParameter = 'sort', customOnChangeHandler, theme }) => {
  const locale = useLocale();
  const { t } = useSearchTranslation();
  const router = useRouter();
  const sort = router.query?.[sortParameter] ?? DEFAULT_EVENT_SORT_OPTION;
  const setSortQueryParamToOptionValue = useSetSortQueryParamToOptionValue();
  const orderByOptions = useEventsOrderBySelectOptions();
  const defaultOption = orderByOptions.find((option) => {
    return option.value === DEFAULT_EVENT_SORT_OPTION;
  });
  const selectedOrderByOption = orderByOptions.find((option) => {
    return option.value === sort;
  });

  return (
    <Select
      theme={theme}
      texts={{
        label: t('search:orderBy.label'),
        language: locale,
      }}
      value={selectedOrderByOption?.value ?? defaultOption?.value}
      onChange={customOnChangeHandler ?? setSortQueryParamToOptionValue}
      options={orderByOptions}
      className={styles.eventsOrderBySelect}
    />
  );
};

export default EventsOrderBySelect;
