import React from 'react';
import { useSearchTranslation } from '../../hooks';
import { FilterButton } from '../filterButton';
import type { FilterType } from '../filterButton';

interface Props {
  onRemove: (value: string, type: FilterType) => void;
}

const ReservableFilter: React.FC<Props> = ({ onRemove }) => {
  const { t } = useSearchTranslation();

  return (
    <FilterButton
      onRemove={onRemove}
      text={t('search:search.reservable')}
      type="reservable"
      value={'true'}
    />
  );
};

export default ReservableFilter;
