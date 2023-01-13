import { FilterButton } from 'events-helsinki-components';
import type { FilterType } from 'events-helsinki-components';
import { useTranslation } from 'next-i18next';
import React from 'react';

export interface AgeFilterProps {
  value: string;
  type: 'minAge' | 'maxAge';
  onRemove: (value: string, type: FilterType) => void;
}

const AgeFilter: React.FC<AgeFilterProps> = ({ value, type, onRemove }) => {
  const { t } = useTranslation(['search', 'common']);
  return (
    <FilterButton
      onRemove={onRemove}
      text={t(`search:search.ageFilter.${type}`, {
        age: value,
        yearAbbr: t('common:yearsShort'),
      })}
      type={type}
      value={value}
    />
  );
};

export default AgeFilter;
