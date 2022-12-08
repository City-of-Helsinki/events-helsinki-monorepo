import classNames from 'classnames';
import type { Venue } from 'events-helsinki-components';
import { useLocale, LoadingSpinner } from 'events-helsinki-components';
import { Button } from 'hds-react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import getTranslation from 'utils/getTranslation';

import LargeEventCard from '../../../domain/event/eventCard/LargeEventCard';
import styles from './venueList.module.scss';

interface Props {
  buttonCentered?: boolean;
  venues: Venue[];
  count: number;
  loading: boolean;
  hasNext: boolean;
  onLoadMore: () => void;
}

const VenueList: React.FC<Props> = ({
  buttonCentered = false,
  venues,
  loading,
  count,
  hasNext,
  onLoadMore,
}) => {
  const { t } = useTranslation('search');
  const venuesLeft = count - venues.length;
  const locale = useLocale();

  return (
    <div className={classNames(styles.venueListWrapper)}>
      <div className={styles.venuesWrapper}>
        {venues.map((venue) => (
          <LargeEventCard
            key={venue?.meta?.id}
            id={venue?.meta?.id ?? ''}
            title={getTranslation(locale, venue?.name)}
            location={getTranslation(
              locale,
              venue?.location?.address?.streetAddress
            )}
            imageUrl={(venue?.images && venue?.images[0]?.url) ?? ''}
            tags={
              venue?.ontologyWords
                ?.map((tag) => tag?.label?.fi ?? '')
                .filter((t) => t) ?? []
            }
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
