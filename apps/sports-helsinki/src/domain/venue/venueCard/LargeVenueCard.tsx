import {
  useLocale,
  getLargeEventCardId,
  useVenueTranslation,
  LoaderLinkBox,
} from 'events-helsinki-components';
import { IconArrowRight, IconLocation } from 'hds-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import {
  BackgroundImage,
  SecondaryLink,
  TagComponent as Tag,
} from 'react-helsinki-headless-cms';
import { ROUTES } from '../../../constants';
import routerHelper from '../../../domain/app/routerHelper';
import styles from './largeVenueCard.module.scss';

interface Props {
  id: string;
  title?: string;
  location?: string;
  imageUrl?: string;
  tags?: string[];
  showMapLink?: boolean;
}

const LargeVenueCard: React.FC<Props> = ({
  id,
  title,
  location,
  tags,
  imageUrl,
  showMapLink = false,
}) => {
  const { t } = useVenueTranslation();
  const router = useRouter();
  const locale = useLocale();

  const venueUrl = routerHelper.getLocalizedCmsItemUrl(
    ROUTES.VENUES,
    {
      venueId: id,
      returnPath: routerHelper.getLocalizedCmsItemUrl(
        ROUTES.SEARCH,
        { ...router.query, venueId: id },
        locale
      ),
    },
    locale
  );

  return (
    <LoaderLinkBox
      type="linkBox"
      aria-label={t('venue:venueCard.ariaLabelLink', {
        name: title,
      })}
      id={getLargeEventCardId(id)}
      data-testid={id}
      href={venueUrl}
    >
      <div className={styles.eventCard}>
        <div className={styles.infoWrapper}>
          <div className={styles.eventName}>{title}</div>
          <div className={styles.eventLocation}>
            <IconLocation aria-hidden />
            {location}
            {showMapLink && (
              <div className={styles.mapLink}>
                <SecondaryLink href={`${ROUTES.MAPSEARCH}?venueId=${id}`}>
                  {t('venue:venueCard.showResultsOnMapLink')}
                </SecondaryLink>
              </div>
            )}
          </div>
          <div className={styles.keywordWrapperDesktop}>
            {tags && tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
          </div>
          <div className={styles.buttonWrapper}>
            <IconArrowRight
              className={styles.arrowRight}
              size="l"
              aria-hidden="true"
            />
          </div>
        </div>
        <BackgroundImage
          className={styles.imageWrapper}
          id={id}
          url={imageUrl || ''}
        />
      </div>
    </LoaderLinkBox>
  );
};

export default LargeVenueCard;
