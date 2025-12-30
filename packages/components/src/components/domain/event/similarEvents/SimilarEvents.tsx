import type { CollectionProps } from '@city-of-helsinki/react-helsinki-headless-cms';
import {
  Collection,
  PageSection,
  ContentContainer,
} from '@city-of-helsinki/react-helsinki-headless-cms';
import React from 'react';
import useEventTranslation from '../../../../hooks/useEventTranslation';
import { useAppRoutingContext } from '../../../../routingUrlProvider';
import type { EventFields } from '../../../../types/event-types';
import type { QueryEventListArgs } from '../../../../types/generated/graphql';
import LoadingSpinner from '../../../spinner/LoadingSpinner';
import { useSimilarEventsQuery } from '../queryUtils';
import useEventCards from '../useEventCards';
import styles from './similarEvents.module.scss';

export type SimilarEventsProps = {
  event: EventFields;
  type?: CollectionProps['type'];
  onEventsLoaded?: (eventsCount: number) => void;
  eventFilters: QueryEventListArgs;
};

export const similarEventsContainerTestId = 'similar-events-container';
export const similarEventsLoadingSpinnerTestId =
  'similar-events-loading-spinner';

const SimilarEvents: React.FC<SimilarEventsProps> = ({
  event,
  type = 'carousel',
  onEventsLoaded,
  eventFilters,
}) => {
  const { t } = useEventTranslation();
  const { getCardUrl } = useAppRoutingContext();
  const { data: events, loading } = useSimilarEventsQuery(event, eventFilters);
  const cards = useEventCards({
    events,
    getCardUrl,
  });
  const hasCards = !!cards.length;

  React.useEffect(() => {
    if (hasCards && onEventsLoaded) {
      onEventsLoaded(cards.length);
    }
  }, [onEventsLoaded, cards.length, hasCards]);

  // Show the similar events -section when it's still loading or there are some events to be shown.
  if (loading || hasCards) {
    return (
      <PageSection
        korosTop
        korosTopClassName={styles.korosTopCollections}
        className={styles.similarEvents}
        data-testid={similarEventsContainerTestId}
      >
        <ContentContainer>
          <LoadingSpinner
            data-testid={similarEventsLoadingSpinnerTestId}
            isLoading={loading}
          >
            <Collection
              type={type}
              title={t('event:similarEvents.title')}
              cards={cards}
              loading={loading}
            />
          </LoadingSpinner>
        </ContentContainer>
      </PageSection>
    );
  }

  // Show nothing / hide the similar events section when there are no events to be shown.
  return null;
};

export default SimilarEvents;
