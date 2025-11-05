import type { UnifiedSearchVenue } from '@events-helsinki/components';
import {
  getTranslation,
  isVenueHelsinkiCityOwned,
  LoadingSpinner,
  useLocale,
} from '@events-helsinki/components';
import classNames from 'classnames';
import { Button, ButtonVariant } from 'hds-react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import getVenueSourceId from '../../../domain/venue/utils/getVenueSourceId';
import LargeVenueCard from '../../venue/venueCard/LargeVenueCard';

import styles from './venueList.module.scss';

interface Props {
  buttonCentered?: boolean;
  venues: UnifiedSearchVenue[];
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
          <LargeVenueCard
            key={getVenueSourceId(venue?.meta?.id ?? '')}
            id={getVenueSourceId(venue?.meta?.id ?? '') ?? ''}
            title={getTranslation(locale, venue?.name)}
            location={`${getTranslation(
              locale,
              venue?.location?.address?.streetAddress
            )}, ${venue?.location?.address?.postalCode} ${getTranslation(
              locale,
              venue?.location?.address?.city
            )}`}
            imageUrl={(venue?.images && venue?.images[0]?.url) ?? ''}
            isHelsinkiCityOwned={isVenueHelsinkiCityOwned(venue)}
            accessibilityShortcomingCount={
              venue?.accessibilityShortcomingFor?.count
            }
            tags={
              venue?.ontologyWords
                ?.map((tag) => getTranslation(locale, tag?.label))
                .filter((t) => t) ?? []
            }
            // showMapLink
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
            <Button onClick={onLoadMore} variant={ButtonVariant.Success}>
              {t('buttonLoadMore', { count: venuesLeft })}
            </Button>
          )}
        </LoadingSpinner>
      </div>
    </div>
  );
};

export default VenueList;
