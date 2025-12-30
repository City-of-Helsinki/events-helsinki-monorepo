import type { CollectionProps } from '@city-of-helsinki/react-helsinki-headless-cms';
import {
  Collection,
  PageSection,
  ContentContainer,
} from '@city-of-helsinki/react-helsinki-headless-cms';
import type {
  GetCardUrlType,
  useLocationUpcomingEventsQueryProps,
} from '@events-helsinki/components';
import {
  LoadingSpinner,
  useVenueTranslation,
  useEventCards,
  useLocationUpcomingEventsQuery,
  EventTypeId,
  EVENT_SEARCH_FILTERS,
} from '@events-helsinki/components';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';

import { ROUTES } from '../../../constants';
import { PARAM_SEARCH_TYPE } from '../../search/combinedSearch/constants';
import { getCardUrl } from '../../search/eventSearch/utils';
import styles from './upcomingEvents.module.scss';

type VenueUpcomingEventsProps = useLocationUpcomingEventsQueryProps & {
  type?: CollectionProps['type'];
  className?: string;
  korosTop?: boolean;
  onEventsLoaded?: (eventsCount: number) => void;
};

export const upcomingEventsContainerTestId = 'similar-events-container';
export const upcomingEventsLoadingSpinnerTestId =
  'similar-events-loading-spinner';

const VenueUpcomingEvents: React.FC<VenueUpcomingEventsProps> = ({
  placeId,
  keywords,
  className,
  type = 'carousel',
  korosTop = false,
  onEventsLoaded,
}) => {
  const router = useRouter();
  const { t } = useVenueTranslation();
  const { loading, data: eventsData } = useLocationUpcomingEventsQuery({
    placeId,
    keywords,
  });
  const cards = useEventCards({
    events: eventsData?.eventList?.data,
    getCardUrl: (
      event: Parameters<GetCardUrlType>[0],
      locale: Parameters<GetCardUrlType>[1]
    ) => getCardUrl(event, locale, router.asPath),
  });
  const hasCards = !!cards.length;

  React.useEffect(() => {
    if (hasCards && onEventsLoaded) {
      onEventsLoaded(cards.length);
    }
  }, [onEventsLoaded, cards.length, hasCards]);

  // Show all URL should search for events that are happening in place
  // eslint-disable-next-line @stylistic/max-len
  const showAllUrl = `${ROUTES.SEARCH}?${PARAM_SEARCH_TYPE}=${EventTypeId.Course}&${EVENT_SEARCH_FILTERS.PLACES}=${placeId}`;

  // Show the section when it's still loading or there are some events to be shown.
  if (loading || hasCards) {
    return (
      <PageSection
        korosTop={korosTop}
        korosTopClassName={styles.korosTopCollections}
        className={classNames(className, styles.upcomingEvents)}
        data-testid={upcomingEventsContainerTestId}
      >
        <ContentContainer>
          <LoadingSpinner
            data-testid={upcomingEventsLoadingSpinnerTestId}
            isLoading={loading}
          >
            <Collection
              type={type}
              title={t('venue:upcomingEvents.title')}
              cards={cards}
              loading={loading}
              showAllUrl={showAllUrl}
            />
          </LoadingSpinner>
        </ContentContainer>
      </PageSection>
    );
  }

  // Show nothing / hide the section when there are no events to be shown.
  return null;
};

export default VenueUpcomingEvents;
