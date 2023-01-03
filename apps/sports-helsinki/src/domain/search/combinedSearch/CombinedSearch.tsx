import {
  EventTypeId,
  useLocale,
  useSearchTranslation,
} from 'events-helsinki-components';
import { useRouter } from 'next/router';
import qs from 'query-string';
import React from 'react';
import { ContentContainer, PageSection } from 'react-helsinki-headless-cms';
import { ROUTES } from '../../../constants';
import { getI18nPath } from '../../../utils/routerUtils';
import type { AdvancedSearchProps } from '../eventSearch/AdvancedSearch';
import AdvancedSearch from '../eventSearch/AdvancedSearch';
import styles from './combinedSearch.module.scss';
import { SearchTab } from './searchUtilities/SearchTabs';
import SearchUtilities from './searchUtilities/SearchUtilities';

export type SearchResultItemsCount = {
  [EventTypeId.Course]: number | null;
  [EventTypeId.General]: number | null;
  Venue: number | null;
};

export type CombinedSearchProps = {
  searchStatus: SearchResultItemsCount;
} & AdvancedSearchProps;

const CombinedSearch: React.FC<CombinedSearchProps> = ({
  searchStatus,
  ...delegatedProps
}) => {
  const { t } = useSearchTranslation();
  const router = useRouter();
  const locale = useLocale();
  const params: { eventType?: string } = router.query;
  const activeSearchEventType = params.eventType
    ? (params.eventType as EventTypeId)
    : null;

  const switchToGeneralEventSearch = () => {
    const searchParams = { ...router.query, eventType: EventTypeId.General };
    router.push(
      `${getI18nPath(ROUTES.COURSESEARCH, locale)}/?${qs.stringify(
        searchParams
      )}`,
      undefined,
      {
        shallow: true,
      }
    );
  };

  const switchToCourseEventSearch = () => {
    const searchParams = { ...router.query, eventType: EventTypeId.Course };
    router.push(
      `${getI18nPath(ROUTES.COURSESEARCH, locale)}/?${qs.stringify(
        searchParams
      )}`,
      undefined,
      {
        shallow: true,
      }
    );
  };

  return (
    <>
      <AdvancedSearch {...delegatedProps} />
      <PageSection className={styles.searchUtilities}>
        <ContentContainer className={styles.contentContainer}>
          <SearchUtilities
            tabs={[
              <SearchTab
                key="general-search-tab"
                onClick={switchToGeneralEventSearch}
                label={t('search:search.searchType.generalEventType')}
                count={searchStatus[EventTypeId.General]}
                active={activeSearchEventType === EventTypeId.General}
              />,
              <SearchTab
                key="course-search-tab"
                onClick={switchToCourseEventSearch}
                label={t('search:search.searchType.courseEventType')}
                count={searchStatus[EventTypeId.Course]}
                active={activeSearchEventType === EventTypeId.Course}
              />,
            ]}
          />
        </ContentContainer>
      </PageSection>
    </>
  );
};

export default CombinedSearch;
