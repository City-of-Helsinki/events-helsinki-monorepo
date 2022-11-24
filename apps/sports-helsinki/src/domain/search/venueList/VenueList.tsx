import classNames from 'classnames';
import { LoadingSpinner } from 'events-helsinki-components';
import type { Venue } from 'events-helsinki-components';
import { Button } from 'hds-react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { Card } from 'react-helsinki-headless-cms';
import styles from './venueList.module.scss';

const venueCardsMap = {
  default: Card,
  large: Card, // TODO: ADD LargeEventCard,
};

interface Props {
  buttonCentered?: boolean;
  cardSize?: 'default' | 'large';
  venues: Venue[];
  count: number;
  loading: boolean;
  hasNext: boolean;
  onLoadMore: () => void;
}

const VenueList: React.FC<Props> = ({
  buttonCentered = false,
  cardSize = 'default',
  venues,
  loading,
  count,
  hasNext,
  onLoadMore,
}) => {
  const { t } = useTranslation('search');
  const venuesLeft = count - venues.length;
  const VenueCard = venueCardsMap[cardSize];

  return (
    <div className={classNames(styles.venueListWrapper, styles[cardSize])}>
      <div className={styles.venuesWrapper}>
        {venues.map((venue) => (
          <VenueCard
            key={venue?.meta?.id}
            title={venue?.name?.fi ?? ''}
            customContent={venue?.description?.fi}
          />
        ))}
      </div>
      <div
        className={classNames(styles.loadMoreWrapper, {
          [styles.buttonCentered]: buttonCentered,
        })}
      >
        <LoadingSpinner hasPadding={!venues.length} isLoading={loading}>
          {hasNext && (
            <Button onClick={onLoadMore} variant="secondary" theme="black">
              {t('buttonLoadMore', { count: venuesLeft })}
            </Button>
          )}
        </LoadingSpinner>
      </div>
    </div>
  );
};

export default VenueList;
