import { useCommonTranslation, Text } from '@events-helsinki/components';
import { IconCross, Button, IconSearch, IconMenuHamburger } from 'hds-react';
import React, { useRef, useState } from 'react';
import styles from './searchHeader.module.scss';

/**
 * @deprecated There should be no need for List-mode,
 * because its content comes totally from a whole different component.
 */
export enum ShowMode {
  MAP = 'map',
  LIST = 'list',
}

type Props = {
  /**
   * @deprecated There should be no need for List-mode,
   * because its content comes totally from a whole different component.
   */
  showMode: ShowMode;
  count: number;
  switchShowMode: () => void;
  searchForm: React.ReactElement;
};

function SearchHeader({ showMode, count, switchShowMode, searchForm }: Props) {
  const { t } = useCommonTranslation();
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const formWrapper = useRef<HTMLDivElement>(null);

  return (
    <>
      {showMode === ShowMode.MAP && (
        <div ref={formWrapper} className={styles.searchHeader}>
          {!collapsed && (
            <div className={styles.searchMenu}>
              {searchForm}
              <div className={styles.closeSearchWrapper}>
                <Button
                  className={styles.closeSearch}
                  variant="secondary"
                  theme="black"
                  iconLeft={<IconCross aria-hidden="true" />}
                  fullWidth
                  onClick={() => setCollapsed(true)}
                >
                  {t('common:mapSearch.closeSearchControls')}
                </Button>
              </div>
            </div>
          )}
          {collapsed && (
            <div className={styles.searchActions}>
              <Button
                variant="secondary"
                theme="black"
                iconLeft={<IconMenuHamburger aria-hidden="true" />}
                onClick={switchShowMode}
              >
                {t('common:mapSearch.showAsList')}
              </Button>
              <div className={styles.countAndTags}>
                <Text variant="h3">
                  {count} {t('common:mapSearch.searchResultsCountLabel')}
                </Text>
              </div>
              <Button
                variant="secondary"
                theme="black"
                iconLeft={<IconSearch aria-hidden="true" />}
                onClick={() => {
                  setCollapsed(false);

                  // This button comes after the actual form in the DOM order.
                  // It's rendered out of the UI as the state changes to
                  // !collapsed, but the focus is re-applied to elements that
                  // come after the form elements.
                  //
                  // This makes the UX cumbersome when using a keyboard or a
                  // screen reader. In order to improve the UX, we are moving
                  // the focus to the beginning of the form when the user
                  // opens it.
                  //
                  // Wait for form to be rendered into the DOM
                  setTimeout(() => {
                    const firstFormInput = formWrapper.current?.querySelector(
                      'form input'
                    ) as HTMLInputElement | null | undefined;

                    // And focus the first input on it
                    firstFormInput?.focus();
                  }, 0);
                }}
              >
                {t('common:mapSearch.showSearchParameters')}
              </Button>
            </div>
          )}
        </div>
      )}
      {showMode === ShowMode.LIST && (
        <div className={styles.searchArea}>{searchForm}</div>
      )}
    </>
  );
}

export default SearchHeader;
