import React from 'react';
import { useCommonTranslation } from '../../hooks';
import { FilterButton } from '../filterButton';
import type { FilterType } from '../filterButton';

interface Props {
  onRemove: (value: string, type: FilterType) => void;
}

const HelsinkiOnlyFilter: React.FC<Props> = ({ onRemove }) => {
  const { t } = useCommonTranslation();

  return (
    <FilterButton
      onRemove={onRemove}
      text={t('common:cityOfHelsinki')}
      type="helsinkiOnly"
      value={'true'}
    />
  );
};

export default HelsinkiOnlyFilter;
