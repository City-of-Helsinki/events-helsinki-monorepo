import {
  ContentContainer,
  PageSection,
} from '@city-of-helsinki/react-helsinki-headless-cms';
import {
  useSearchTranslation,
  EventTypeId,
  getURLSearchParamsFromAsPath,
  useCommonTranslation,
} from '@events-helsinki/components';
import { Button, ButtonPresetTheme, ButtonVariant } from 'hds-react';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { SEARCH_ROUTES } from '../../../constants';
import styles from './combinedSearchPage.module.scss';
import { useSearchTabResultCounts } from './hooks';
import type { TabDataType } from './searchTabs/SearchTabs';
import SearchTabs from './searchTabs/SearchTabs';
import { useTabsContext } from './searchTabs/tabsContext';

function SearchUtilities() {
  const { t: tSearch } = useSearchTranslation();
  const { t: tCommon } = useCommonTranslation();
  const router = useRouter();
  const switchShowMode = () => {
    const searchParams = getURLSearchParamsFromAsPath(router.asPath);
    router.push({
      pathname: SEARCH_ROUTES.MAPSEARCH,
      query: searchParams.toString(),
    });
  };
  const { activeTab } = useTabsContext();
  useSearchTabResultCounts();

  const tabsData = useMemo(
    (): TabDataType[] => [
      {
        id: 'Venue',
        label: tSearch('search:search.searchType.Venue'),
      },
      {
        id: EventTypeId.General,
        label: tSearch(`search:search.searchType.${EventTypeId.General}`),
      },
      {
        id: EventTypeId.Course,
        label: tSearch(`search:search.searchType.${EventTypeId.Course}`),
      },
    ],
    [tSearch]
  );

  return (
    <PageSection className={styles.searchUtilities}>
      <ContentContainer className={styles.contentContainer}>
        <div
          className={styles.flexEnd}
          role="navigation"
          aria-describedby="searchTabsDescription"
        >
          <SearchTabs.TabList>
            {tabsData.map((tab) => (
              <SearchTabs.Tab
                key={tab.id}
                id={tab.id}
                theme={ButtonPresetTheme.Black}
              >
                <SearchTabs.CountLabel id={tab.id} label={tab.label} />
              </SearchTabs.Tab>
            ))}
          </SearchTabs.TabList>
          <SearchTabs.SearchTabListMobile data={tabsData} />

          {activeTab === 'Venue' ? (
            <Button
              variant={ButtonVariant.Secondary}
              theme={ButtonPresetTheme.Black}
              onClick={switchShowMode}
              className={styles.buttonWrapper}
            >
              {tCommon('common:mapSearch.showOnMap')}
            </Button>
          ) : null}
        </div>
      </ContentContainer>
    </PageSection>
  );
}

export default SearchUtilities;
