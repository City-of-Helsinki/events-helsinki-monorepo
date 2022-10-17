import classNames from 'classnames';
import type { FunctionComponent, MutableRefObject } from 'react';
import React from 'react';
import { useCommonTranslation } from '../../hooks';
import DateRangePicker from '../dateRangePicker/DateRangePicker';
import styles from './mobileDateSelectorMenu.module.scss';

export const testIds = {
  menu: 'mobile-date-selector-menu',
};

interface Props {
  closeBtnRef?: MutableRefObject<HTMLButtonElement | null>;
  endDate: Date | null;
  isOpen: boolean;
  onChangeEndDate: (date: Date | null) => void;
  onChangeStartDate: (date: Date | null) => void;
  onCloseMenu: () => void;
  startDate: Date | null;
}

const MobileDateSelectorMenu: FunctionComponent<Props> = ({
  closeBtnRef,
  endDate,
  isOpen,
  onChangeEndDate,
  onChangeStartDate,
  onCloseMenu,
  startDate,
}) => {
  const { t } = useCommonTranslation();
  if (!isOpen) return null;
  return (
    <div data-testid={testIds.menu} className={styles.mobileDateSelectorMenu}>
      <div className={styles.wrapper}>
        <DateRangePicker
          endDate={endDate}
          onChangeEndDate={onChangeEndDate}
          onChangeStartDate={onChangeStartDate}
          startDate={startDate}
        />
      </div>
      <button
        ref={closeBtnRef}
        className={classNames(styles.button, styles.btnClose)}
        onClick={onCloseMenu}
      >
        <div className={styles.buttonText}>
          {t('common:dateSelector.menu.buttonClose') as string}
        </div>
      </button>
    </div>
  );
};

export default MobileDateSelectorMenu;
