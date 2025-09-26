import React from 'react';
import useCommonTranslation from '../../hooks/useCommonTranslation';
import styles from './dropdownMenu.module.scss';

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  onClear?: () => void;
}

const DropdownMenu: React.FC<Props> = ({ children, isOpen, onClear }) => {
  const { t } = useCommonTranslation();
  if (!isOpen) return null;

  return (
    <div className={styles.dropdownMenu}>
      <div className={styles.dropdownMenuWrapper}>{children}</div>
      {onClear && (
        <button className={styles.btnClear} onClick={onClear} type="button">
          {t('common:dropdown.menu.buttonClear')}
        </button>
      )}
    </div>
  );
};

export default DropdownMenu;
