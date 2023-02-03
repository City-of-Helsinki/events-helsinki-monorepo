import type { EventTypeId, EventListQuery } from 'events-helsinki-components';
import {
  EventsOrderBySelect,
  BasicMeta,
  LoadingSpinner,
  SrOnly,
  useSearchTranslation,
  MAIN_CONTENT_ID,
} from 'events-helsinki-components';
import React from 'react';
import EventList from '../../../common-events/components/eventList/EventList';
import type { AdvancedSearchProps } from './AdvancedSearch';
import styles from './eventSearchPage.module.scss';
import useSearchPage from './hooks/useSearchPage';
import SearchResultsContainer from './searchResultList/SearchResultsContainer';

type SearchPageProps = {
  SearchComponent?: React.FC<AdvancedSearchProps>;
  pageTitle: string;
  eventType: EventTypeId;
};

const EventSearchPage: React.FC<SearchPageProps> = ({
  SearchComponent,
  pageTitle,
  eventType,
}) => {
  const { t } = useSearchTranslation();
  const {
    resultList,
    handleLoadMore,
    isLoading: isLoadingEvents,
    isFetchingMore,
    meta,
    scrollToResultList,
    initialPageOnLoad,
    count,
    hasNext,
  } = useSearchPage({ eventType });

  const eventsList = resultList as EventListQuery['eventList'];

  React.useEffect(() => {
    initialPageOnLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <BasicMeta
        title={pageTitle}
        appleTouchIconUrl={meta?.appleTouchIconUrl}
        favIconUrl={meta?.favIconUrl}
        favIconSvgUrl={meta?.favIconSvgUrl}
        manifestUrl={meta?.manifestUrl}
      />
      <SrOnly as="h1">{pageTitle}</SrOnly>
      {SearchComponent && (
        <SearchComponent
          scrollToResultList={scrollToResultList}
          data-testid="searchContainer"
        />
      )}
      <main id={MAIN_CONTENT_ID}>
        <div
          className={styles.resultList}
          id="resultList"
          data-testid="resultList"
        >
          <SrOnly aria-live="polite" aria-atomic={true}>
            {isLoadingEvents
              ? t('search:ariaLiveLoading')
              : t('search:ariaLiveSearchReady', {
                  count: eventsList?.meta.count,
                })}
          </SrOnly>
          <LoadingSpinner
            className={styles.spinner}
            isLoading={
              (!isFetchingMore && isLoadingEvents) || !eventsList?.data
            }
          >
            {eventsList && (
              <SearchResultsContainer
                eventsCount={eventsList.meta.count}
                loading={isLoadingEvents}
                eventList={
                  <EventList
                    cardSize="large"
                    events={eventsList.data}
                    hasNext={hasNext}
                    count={count}
                    loading={isFetchingMore}
                    onLoadMore={handleLoadMore}
                  />
                }
                orderBySelectComponent={<EventsOrderBySelect />}
              />
            )}
          </LoadingSpinner>
        </div>
      </main>
    </div>
  );
};

export default EventSearchPage;
