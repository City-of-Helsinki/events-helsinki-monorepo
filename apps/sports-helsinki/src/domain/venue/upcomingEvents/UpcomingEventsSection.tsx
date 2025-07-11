import type {
  GetCardUrlType,
  useLocationUpcomingEventsQueryProps,
} from '@events-helsinki/components';
import {
  LoadingSpinner,
  useVenueTranslation,
  useEventCards,
  useLocationUpcomingEventsQuery,
} from '@events-helsinki/components';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import type { CollectionProps } from 'react-helsinki-headless-cms';
import {
  Collection,
  PageSection,
  ContentContainer,
} from 'react-helsinki-headless-cms';

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
