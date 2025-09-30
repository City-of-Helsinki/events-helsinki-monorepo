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
  startDateInputRef?: MutableRefObject<HTMLInputElement | null>;
  endDate: Date | null;
  isOpen: boolean;
  onChangeEndDate: (date: Date | null) => void;
  onChangeStartDate: (date: Date | null) => void;
  onCloseMenu: () => void;
  startDate: Date | null;
  showCloseButton?: boolean;
}

const MobileDateSelectorMenu: FunctionComponent<Props> = ({
  closeBtnRef,
  startDateInputRef,
  endDate,
  isOpen,
  onChangeEndDate,
  onChangeStartDate,
  onCloseMenu,
  startDate,
  showCloseButton = false,
}) => {
  const { t } = useCommonTranslation();
  if (!isOpen) return null;
  return (
    <div
      data-testid={testIds.menu}
      className={styles.mobileDateSelectorMenu}
      aria-live="polite"
      role="menu"
    >
      <div className={styles.wrapper}>
        <DateRangePicker
          startDateInputRef={startDateInputRef}
          endDate={endDate}
          onChangeEndDate={onChangeEndDate}
          onChangeStartDate={onChangeStartDate}
          startDate={startDate}
        />
      </div>
      {showCloseButton && (
        // FIXME: accessibility issues are reported in close-button. Now not rendered by default. See ticket HH-376.
        <button
          ref={closeBtnRef}
          className={classNames(styles.button, styles.btnClose)}
          onClick={onCloseMenu}
        >
          <div className={styles.buttonText}>
            {t('common:dateSelector.menu.buttonClose') as string}
          </div>
        </button>
      )}
    </div>
  );
};

export default MobileDateSelectorMenu;
