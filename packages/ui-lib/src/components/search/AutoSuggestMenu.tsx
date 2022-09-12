import type { AutosuggestMenuOption } from '@events-helsinki/core-lib/types';
import classNames from 'classnames';
import { IconCross } from 'hds-react';
import { useTranslation } from 'next-i18next';
import type { FunctionComponent } from 'react';
import React from 'react';

import styles from './autosuggestMenu.module.scss';

interface Props {
  focusedOption: number;
  isOpen: boolean;
  onClose: () => void;
  onOptionClick: (item: AutosuggestMenuOption) => void;
  options: AutosuggestMenuOption[];
}

const AutoSuggestMenu: FunctionComponent<Props> = ({
  focusedOption,
  isOpen,
  onClose,
  onOptionClick,
  options,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className={styles.autosuggestMenu}>
      <div className={styles.title}>
        {t('common:autosuggest.menu.title')}
        <button
          aria-label={t('common:autosuggest.menu.ariaButtonClose')}
          className={styles.closeButton}
          onClick={onClose}
        >
          <IconCross aria-hidden />
        </button>
      </div>
      <ul className={styles.autosuggestOptions} role="listbox">
        {options.map((option, index) => {
          const handleClick = () => {
            onOptionClick(option);
          };
          const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
            // check keys if you want
            if (event.keyCode == 13) {
              handleClick();
            }
          };

          return (
            <li
              key={index}
              className={classNames(
                styles.autosuggestOption,
                styles[`autosuggestOption--${option.type}`],
                {
                  [styles['autosuggestOption--isFocused']]:
                    focusedOption === index,
                }
              )}
              role="option"
              tabIndex={-1}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              aria-selected={focusedOption === index}
            >
              <div className={styles.text}>{option.text}</div>
            </li>
          );
        })}
      </ul>

      <div className={styles.info}>{t('common:autosuggest.menu.info')}</div>
    </div>
  );
};

export default AutoSuggestMenu;
