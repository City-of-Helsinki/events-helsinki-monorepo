import type { Venue } from '@events-helsinki/components';
import {
  useVenueTranslation,
  LoadingSpinner,
} from '@events-helsinki/components';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import type { CollectionProps } from 'react-helsinki-headless-cms';
import {
  Collection,
  ContentContainer,
  PageSection,
} from 'react-helsinki-headless-cms';
import { useSimilarVenuesQuery } from '../../../domain/event/queryUtils';
import useVenueCards from '../useVenueCards';
import styles from './similarVenues.module.scss';

export const similarVenuesContainerTestId = 'similar-venues-container';
export const similarVenuesLoadingSpinnerTestId =
  'similar-venues-loading-spinner';

type SimilarVenuesProps = {
  venue: Venue;
  type?: CollectionProps['type'];
};

type SimilarVenuesSectionProps = SimilarVenuesProps & {
  className?: string;
  korosTop?: boolean;
  onVenuesLoaded?: (venuesCount: number) => void;
};

const SimilarVenuesSection: React.FC<SimilarVenuesSectionProps> = ({
  venue,
  className,
  type = 'carousel',
  korosTop = false,
  onVenuesLoaded,
}) => {
  const router = useRouter();
  const { t } = useVenueTranslation();
  const { data: venuesData, loading } = useSimilarVenuesQuery({
    venue,
  });
  const venues = venuesData?.venuesByIds as Venue[];
  const cards = useVenueCards({ venues, returnPath: router.asPath });
  const hasCards = !!cards.length;

  React.useEffect(() => {
    if (hasCards) {
      onVenuesLoaded && onVenuesLoaded(cards.length);
    }
  }, [onVenuesLoaded, cards.length, hasCards]);

  // Show the similar venues -section when it's still loading or there are some venues to be shown.
  if (loading || hasCards) {
    return (
      <PageSection
        korosTop={korosTop}
        korosTopClassName={styles.korosTopCollections}
        className={classNames(className, styles.similarVenues)}
        data-testid={similarVenuesContainerTestId}
      >
        <ContentContainer>
          <LoadingSpinner
            data-testid={similarVenuesLoadingSpinnerTestId}
            isLoading={loading}
          >
            <Collection
              type={type}
              title={t('venue:similarVenues.title')}
              cards={cards}
              loading={loading}
            />
          </LoadingSpinner>
        </ContentContainer>
      </PageSection>
    );
  }

  // Show nothing / hide the similar venues section when there are no venues to be shown.
  return null;
};

export default SimilarVenuesSection;
