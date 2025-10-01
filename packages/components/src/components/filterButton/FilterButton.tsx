import type { TagCustomTheme } from 'hds-react';
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
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

const FilterButton: React.FC<Props> = ({
  onRemove,
  text,
  type,
  value,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
}) => {
  const { t } = useCommonTranslation();
  const handleRemove = () => {
    onRemove(value, type);
  };

  const theme = {
    '--tag-background': 'var(--color-black-70)',
    '--tag-color': 'var(--color-white)',
    '--tag-focus-outline-color': 'var(--color-black-90)',
  } as TagCustomTheme;

  return (
    <Tag
      theme={theme}
      onDelete={handleRemove}
      deleteButtonAriaLabel={t('common:filter.ariaButtonRemove', {
        filter: text,
      })}
      className={styles.filter}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
    >
      {text}
    </Tag>
  );
};

export default FilterButton;
