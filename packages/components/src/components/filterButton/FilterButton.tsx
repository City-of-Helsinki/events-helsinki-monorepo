import classNames from 'classnames';
import { IconCross } from 'hds-react';
import React from 'react';

import useCommonTranslation from '../../hooks/useCommonTranslation';
import styles from './filterButton.module.scss';
import type { FilterType } from './types';

interface Props {
  onRemove: (value: string, type: FilterType) => void;
  text: string;
  type: FilterType;
  value: string;
}

const FilterButton: React.FC<Props> = ({ onRemove, text, type, value }) => {
  const { t } = useCommonTranslation();
  const handleRemove = () => {
    onRemove(value, type);
  };

  return (
    <div className={classNames(styles.filter, styles[type])}>
      {text}
      <button
        type="button"
        className={styles.closeButton}
        onClick={handleRemove}
        aria-label={t('common:filter.ariaButtonRemove', {
          filter: text,
        })}
      >
        <IconCross size="s" aria-hidden />
      </button>
    </div>
  );
};

export default FilterButton;
