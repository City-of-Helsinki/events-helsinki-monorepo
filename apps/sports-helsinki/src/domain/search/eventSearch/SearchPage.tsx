import type { EventListQuery, Option } from '@events-helsinki/components';
import {
  EventTypeId,
  EventsOrderBySelect,
  BasicMeta,
  LoadingSpinner,
  SrOnly,
  useSearchTranslation,
  MAIN_CONTENT_ID,
  EventList,
} from '@events-helsinki/components';
import React from 'react';

import AppConfig from '../../app/AppConfig';
import { useCombinedSearchContext } from '../combinedSearch/adapters/CombinedSearchContext';
import type { SearchComponentType } from '../combinedSearch/types';
import styles from './eventSearchPage.module.scss';
import useSearchPage from './hooks/useSearchPage';
import SearchResultsContainer from './searchResultList/SearchResultsContainer';
import { getEventUrl } from './utils';

type SearchPageProps = {
  SearchComponent?: React.FC<SearchComponentType>;
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

  const { setFormValues, updateRouteToSearchPage } = useCombinedSearchContext();

  const eventsList = resultList as EventListQuery['eventList'];

  React.useEffect(() => {
    initialPageOnLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const orderByHandler = (option: Option) => {
    // Update the combined search form context
    // NOTE: this could also be set independently for both the event search types by checking the eventType
    setFormValues({
      eventOrderBy: option.value,
      courseOrderBy: option.value,
    });
    // Update the URL
    updateRouteToSearchPage({ shallow: true });
  };

  return (
    <div>
      <BasicMeta
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
            {isLoadingEvents || isFetchingMore
              ? t('search:ariaLiveLoading')
              : t('search:ariaLiveSearchReady', {
                  totalCount: eventsList?.meta.count,
                  shownCount: eventsList?.data.length,
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
                itemType={eventType}
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
                    getEventUrl={(event, router, locale) =>
                      getEventUrl(event, router, locale)
                    }
                    showEnrolmentStatusInCardDetails={
                      AppConfig.showEnrolmentStatusInCardDetails
                    }
                    loadMoreButtonVariant="success"
                  />
                }
                orderBySelectComponent={
                  <EventsOrderBySelect
                    sortParameter={
                      eventType === EventTypeId.Course
                        ? 'courseOrderBy'
                        : 'eventOrderBy'
                    }
                    customOnChangeHandler={orderByHandler}
                  />
                }
              />
            )}
          </LoadingSpinner>
        </div>
      </main>
    </div>
  );
};

export default EventSearchPage;
