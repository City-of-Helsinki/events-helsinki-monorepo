import classNames from 'classnames';
import { IconAngleDown, IconAngleUp, IconCalendarClock } from 'hds-react';
import React from 'react';
import type { FunctionComponent } from 'react';
import { DATE_TYPES } from '../../constants';
import { useCommonTranslation } from '../../hooks';
import useLocale from '../../hooks/useLocale';
import { formatDate, translateValue } from '../../utils';
import styles from './dateSelector.module.scss';
import DateSelectorMenu from './DateSelectorMenu';

const dateTypeOptions = [
  DATE_TYPES.TODAY,
  DATE_TYPES.TOMORROW,
  DATE_TYPES.THIS_WEEK,
  DATE_TYPES.WEEKEND,
];

export interface DateSelectorProps {
  dateTypes: string[];
  endDate: Date | null;
  isCustomDate: boolean;
  name: string;
  onChangeDateTypes: (value: string[]) => void;
  onChangeEndDate: (date: Date | null) => void;
  onChangeStartDate: (date: Date | null) => void;
  startDate: Date | null;
  toggleIsCustomDate: () => void;
}

const DateSelector: FunctionComponent<DateSelectorProps> = ({
  dateTypes,
  endDate,
  isCustomDate,
  name,
  onChangeDateTypes,
  onChangeEndDate,
  onChangeStartDate,
  startDate,
  toggleIsCustomDate,
}) => {
  const { t } = useCommonTranslation();
  const locale = useLocale();
  const backBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const customDatesBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const dateSelector = React.useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const ensureMenuIsOpen = React.useCallback(() => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
    }
  }, [isMenuOpen]);

  const ensureMenuIsClosed = React.useCallback(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMenuOpen]);

  const handleDocumentClick = React.useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const current = dateSelector.current;

      // Close menu when clicking outside of the component
      if (
        !(target instanceof Node && current?.contains(target)) &&
        target?.isConnected
      ) {
        // target might not be part of dom anymore
        ensureMenuIsClosed();
      }
    },
    [ensureMenuIsClosed]
  );

  const isComponentFocused = React.useCallback(() => {
    const active = document.activeElement;
    const current = dateSelector.current;

    return !!(active instanceof Node && current?.contains(active));
  }, [dateSelector]);

  const handleDocumentFocusin = React.useCallback(() => {
    if (!isComponentFocused()) {
      ensureMenuIsClosed();
    }
  }, [ensureMenuIsClosed, isComponentFocused]);

  const handleDocumentKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (!isComponentFocused()) return;

      switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
          ensureMenuIsOpen();
          event.preventDefault();
          break;
        case 'Escape':
          ensureMenuIsClosed();
          event.preventDefault();
          break;
      }
    },
    [ensureMenuIsClosed, ensureMenuIsOpen, isComponentFocused]
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  React.useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleDocumentKeyDown);
    document.addEventListener('focusin', handleDocumentFocusin);
    // Clean up event listener to prevent memory leaks
    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keydown', handleDocumentKeyDown);
      document.removeEventListener('focusin', handleDocumentFocusin);
    };
  }, [handleDocumentClick, handleDocumentFocusin, handleDocumentKeyDown]);

  const handleToggleIsCustomDate = () => {
    toggleIsCustomDate();
  };

  const isSelected = isCustomDate
    ? !!startDate || !!endDate
    : !!dateTypes.length;

  const selectedText = React.useMemo(() => {
    if (!!startDate || !!endDate) {
      return `${formatDate(startDate, undefined, locale)} -
            ${formatDate(endDate, undefined, locale)}`;
    }

    const sortDateTypes = (a: string, b: string): number =>
      dateTypeOptions.indexOf(a) < dateTypeOptions.indexOf(b) ? -1 : 1;

    const dateTypeLabels = dateTypes
      .sort(sortDateTypes)
      .map((val) => translateValue('common:dateSelector.dateType', val, t));

    if (dateTypeLabels.length > 1) {
      return `${dateTypeLabels[0]} + ${dateTypeLabels.length - 1}`;
    } else {
      return dateTypeLabels.join();
    }
  }, [dateTypes, endDate, locale, startDate, t]);

  React.useEffect(() => {
    if (isComponentFocused() && !isCustomDate) {
      customDatesBtnRef.current?.focus();
    }
  }, [isComponentFocused, isCustomDate]);

  return (
    <div className={styles.dateSelector} ref={dateSelector}>
      <button
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        aria-label={t('common:dateSelector.title')}
        className={styles.button}
        onClick={toggleMenu}
        type="button"
      >
        <div className={styles.iconWrapper}>
          <IconCalendarClock aria-hidden />
        </div>
        <div className={styles.info}>
          <div
            className={classNames(
              styles.buttonTextWrapper,
              !selectedText && styles.isEmpty
            )}
          >
            {selectedText || (t('common:dateSelector.title') as string)}
          </div>
        </div>
        <div className={styles.arrowWrapper}>
          {isMenuOpen ? (
            <IconAngleUp aria-hidden />
          ) : (
            <IconAngleDown aria-hidden />
          )}
        </div>
      </button>
      {isSelected && <div className={styles.isSelectedIndicator} />}
      <DateSelectorMenu
        backBtnRef={backBtnRef}
        customDatesBtnRef={customDatesBtnRef}
        dateTypes={dateTypes}
        dateTypeOptions={dateTypeOptions}
        endDate={endDate}
        isCustomDate={isCustomDate}
        isOpen={isMenuOpen}
        name={name}
        onChangeDateTypes={onChangeDateTypes}
        onChangeEndDate={onChangeEndDate}
        onChangeStartDate={onChangeStartDate}
        startDate={startDate}
        toggleIsCustomDate={handleToggleIsCustomDate}
        onCloseMenu={ensureMenuIsClosed}
      />
    </div>
  );
};

export default DateSelector;
