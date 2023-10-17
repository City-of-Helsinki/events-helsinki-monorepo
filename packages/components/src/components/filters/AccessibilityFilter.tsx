import React from 'react';

import { useSearchTranslation } from '../../hooks';
import { FilterButton } from '../filterButton';
import type { FilterType } from '../filterButton';

interface Props {
  id: string;
  onRemove: (value: string, type: FilterType) => void;
}
const AccessibilityFilter: React.FC<Props> = ({ id, onRemove }) => {
  const { t } = useSearchTranslation();
  return (
    <FilterButton
      onRemove={onRemove}
      text={t(`accessibilityShortcoming.${id}`)}
      value={id}
      type="accessibility"
    />
  );
};
export default AccessibilityFilter;
