import {
  useCommonTranslation,
  Text,
  MAIN_CONTENT_ID,
} from '@events-helsinki/components';

import classNames from 'classnames';
import {
  Button,
  ButtonPresetTheme,
  ButtonVariant,
  IconAngleDown,
  IconAngleUp,
  IconMenuHamburger,
} from 'hds-react';
import React, { useRef, useState } from 'react';
import { ContentContainer, PageSection } from 'react-helsinki-headless-cms';
import styles from './searchHeader.module.scss';

type Props = {
  count: number;
  switchShowMode: () => void;
  searchForm: React.ReactElement;
};

function SearchHeader({ count, switchShowMode, searchForm }: Props) {
  const { t } = useCommonTranslation();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const formWrapper = useRef<HTMLDivElement>(null);
  const collapsedComponent = () => (
    <div>
      <PageSection
        korosBottom={true}
        korosBottomClassName={styles.searchContainerKoros}
        className={classNames(styles.searchContainer, {})}
      >
        <ContentContainer className={classNames(styles.contentContainer, {})}>
          {searchForm}
        </ContentContainer>
      </PageSection>
    </div>
  );
  return (
    <div id={MAIN_CONTENT_ID} ref={formWrapper} className={styles.searchHeader}>
      <>
        {collapsed && collapsedComponent()}
        {!collapsed && (
          <PageSection>
            <div className={styles.horizontalDivider}></div>
          </PageSection>
        )}
        <PageSection>
          <ContentContainer>
            <div
              className={classNames(styles.searchActions, {
                [styles.paddingClosed]: !collapsed,
              })}
            >
              <div className={styles.countAndTags}>
                <Text variant="h3">
                  {count} {t('common:mapSearch.searchResultsCountLabel')}
                </Text>
              </div>
              <Button
                variant={ButtonVariant.Supplementary}
                theme={ButtonPresetTheme.Black}
                iconStart={
                  (collapsed && <IconAngleUp aria-hidden="true" />) ||
                  (!collapsed && <IconAngleDown aria-hidden="true" />)
                }
                onClick={() => {
                  setCollapsed(() => !collapsed);

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
                {collapsed
                  ? t('common:mapSearch.hideSearchParameters')
                  : t('common:mapSearch.showSearchParameters')}
              </Button>
              <Button
                variant={ButtonVariant.Secondary}
                theme={ButtonPresetTheme.Black}
                iconStart={<IconMenuHamburger aria-hidden="true" />}
                onClick={switchShowMode}
              >
                {t('common:mapSearch.showAsList')}
              </Button>
            </div>
          </ContentContainer>
        </PageSection>
      </>
    </div>
  );
}

export default SearchHeader;
