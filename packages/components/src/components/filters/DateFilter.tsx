import React from 'react';
import { useCommonTranslation } from '../../hooks';
import { translateValue } from '../../utils';
import { FilterButton } from '../filterButton';
import type { DateFilterType, FilterType } from '../filterButton';

export interface DateFilterProps {
  onRemove: (value: string, type: FilterType) => void;
  text?: string;
  type: DateFilterType;
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
