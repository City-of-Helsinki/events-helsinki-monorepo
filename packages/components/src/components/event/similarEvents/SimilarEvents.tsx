import { useRouter } from 'next/router';
import React from 'react';
import type { CollectionProps } from 'react-helsinki-headless-cms';
import {
  Collection,
  PageSection,
  ContentContainer,
} from 'react-helsinki-headless-cms';
import type {
  EventFields,
  UseEventCardsFunction,
  UseSimilarEventsQuery,
  useEventCardsProps,
} from '../../../index';
import { LoadingSpinner, useEventTranslation } from '../../../index';
// import { useSimilarEventsQuery } from '../queryUtils';
// import useEventCards from '../useEventCards';
import styles from './similarEvents.module.scss';

interface Props {
  event: EventFields;
  type?: CollectionProps['type'];
  onEventsLoaded?: (eventsCount: number) => void;
  useSimilarEventsQuery: UseSimilarEventsQuery;
  useEventCards: UseEventCardsFunction;
}

export const similarEventsContainerTestId = 'similar-events-container';
export const similarEventsLoadingSpinnerTestId =
  'similar-events-loading-spinner';

const SimilarEvents: React.FC<Props> = ({
  event,
  type = 'carousel',
  onEventsLoaded,
  useSimilarEventsQuery,
  useEventCards,
}) => {
  const { t } = useEventTranslation();
  const router = useRouter();
  const { data: events, loading } = useSimilarEventsQuery(event);
  const cards = useEventCards({ events, returnPath: router.asPath });
  const hasCards = !!cards.length;

  React.useEffect(() => {
    if (hasCards) {
      onEventsLoaded && onEventsLoaded(cards.length);
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
