import {
  translateValue,
  FilterButton,
  useCommonTranslation,
} from 'events-helsinki-components';
import type { FilterType } from 'events-helsinki-components';
import React from 'react';

export interface DateFilterProps {
  onRemove: (value: string, type: FilterType) => void;
  text?: string;
  type: 'date' | 'dateType';
  value: string;
}

const DateFilter: React.FC<DateFilterProps> = ({
  onRemove,
  text,
  type,
  value,
}) => {
  const { t } = useCommonTranslation();

  return (
    <FilterButton
      onRemove={onRemove}
      text={text || translateValue('common:dateSelector.dateType', value, t)}
      type={type}
      value={value}
    />
  );
};

export default DateFilter;
