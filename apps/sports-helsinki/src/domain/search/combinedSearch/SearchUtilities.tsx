import {
  useSearchTranslation,
  EventTypeId,
  getURLSearchParamsFromAsPath,
  useCommonTranslation,
} from 'events-helsinki-components';
import { Button } from 'hds-react';
import { useRouter } from 'next/router';
import React from 'react';
import { ContentContainer, PageSection } from 'react-helsinki-headless-cms';
import { SEARCH_ROUTES } from '../../../constants';
import styles from './combinedSearchPage.module.scss';
import { useSearchTabResultCounts } from './hooks';
import SearchTabs from './searchTabs/SearchTabs';
import { useTabsContext } from './searchTabs/tabsContext';

function SearchUtilities() {
  const { t: tSearch } = useSearchTranslation();
  const { t: tCommon } = useCommonTranslation();
  const router = useRouter();
  const switchShowMode = () => {
    const searchParams = getURLSearchParamsFromAsPath(router.asPath);
    router.replace({
      pathname: SEARCH_ROUTES.MAPSEARCH,
      query: searchParams.toString(),
    });
  };
  const { activeTab } = useTabsContext();
  useSearchTabResultCounts();

  return (
    <PageSection className={styles.searchUtilities}>
      <ContentContainer className={styles.contentContainer}>
        <div className={styles.flexEnd}>
          <SearchTabs.TabList>
            <SearchTabs.Tab id="Venue">
              <SearchTabs.CountLabel
                id="Venue"
                label={tSearch('search:search.searchType.venue')}
              />
            </SearchTabs.Tab>
            <SearchTabs.Tab id={EventTypeId.General}>
              <SearchTabs.CountLabel
                id={EventTypeId.General}
                label={tSearch('search:search.searchType.generalEventType')}
              />
            </SearchTabs.Tab>
            <SearchTabs.Tab id={EventTypeId.Course}>
              <SearchTabs.CountLabel
                id={EventTypeId.Course}
                label={tSearch('search:search.searchType.courseEventType')}
              />
            </SearchTabs.Tab>
          </SearchTabs.TabList>

          {activeTab === 'Venue' ? (
            <Button
              variant="secondary"
              theme="black"
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
