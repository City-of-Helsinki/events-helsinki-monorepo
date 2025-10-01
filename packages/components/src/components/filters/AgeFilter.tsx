import React from 'react';
import { useCommonTranslation, useSearchTranslation } from '../../hooks';
import type { FilterType, AgeFilterType } from '../filterButton';
import { FilterButton } from '../filterButton';

export interface AgeFilterProps {
  value: string;
  type: AgeFilterType;
  onRemove: (value: string, type: FilterType) => void;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

const AgeFilter: React.FC<AgeFilterProps> = ({
  value,
  type,
  onRemove,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
}) => {
  const { t } = useCommonTranslation();
  const { t: s } = useSearchTranslation();

  return (
    <FilterButton
      onRemove={onRemove}
      text={s(`search:search.ageFilter.${type}`, {
        age: value,
        yearAbbr: t('common:yearsShort'),
      })}
      type={type}
      value={value}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
    />
  );
};

export default AgeFilter;
