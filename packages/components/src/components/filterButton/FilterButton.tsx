import type { TagTheme } from 'hds-react';
import { Tag } from 'hds-react';
import React from 'react';

import useCommonTranslation from '../../hooks/useCommonTranslation';
import styles from './filterButton.module.scss';
import type { FilterType } from './types';

interface Props {
  onRemove: (value: string, type: FilterType) => void;
  text: string;
  type: FilterType;
  value: string;
  'aria-describedby'?: string;
}

const FilterButton: React.FC<Props> = ({
  onRemove,
  text,
  type,
  value,
  'aria-describedby': ariaDescribedBy,
}) => {
  const { t } = useCommonTranslation();
  const handleRemove = () => {
    onRemove(value, type);
  };

  const theme: TagTheme = {
    '--background-color': 'var(--color-black-70)',
    '--color': 'var(--color-white)',
    '--outline-color': 'var(--color-black-90)',
  };

  return (
    <Tag
      theme={theme}
      onDelete={handleRemove}
      aria-label={t('common:filter.ariaButtonRemove', {
        filter: text,
      })}
      className={styles.filter}
      aria-describedby={ariaDescribedBy}
    >
      {text}
    </Tag>
  );
};

export default FilterButton;
