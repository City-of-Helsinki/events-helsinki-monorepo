import {
  useLocale,
  getLargeEventCardId,
  useVenueTranslation,
  ArrowRightWithLoadingIndicator,
  useClickCapture,
  HelsinkiCityOwnedIcon,
  useCommonTranslation,
} from '@events-helsinki/components';
import { IconLocation, IconSize } from 'hds-react';
import { useRouter } from 'next/router';
import React from 'react';
import {
  BackgroundImage,
  LinkBox,
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
  isHelsinkiCityOwned?: boolean;
  accessibilityShortcomingCount?: number | null;
  tags?: string[];
  showMapLink?: boolean;
}

const LargeVenueCard: React.FC<Props> = ({
  id,
  title,
  location,
  tags,
  imageUrl,
  isHelsinkiCityOwned,
  accessibilityShortcomingCount,
  showMapLink = false,
}) => {
  const { t } = useVenueTranslation();
  const { t: commonTranslation } = useCommonTranslation();
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

  const { clickCaptureRef, clicked } = useClickCapture(1000);

  return (
    <div ref={clickCaptureRef}>
      <LinkBox
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
            <div className={styles.eventName}>
              {title}
              {isHelsinkiCityOwned && <HelsinkiCityOwnedIcon />}
            </div>
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
            {accessibilityShortcomingCount !== undefined && (
              <div className={styles.keywordWrapperDesktop}>
                <Tag selected>
                  {accessibilityShortcomingCount === null
                    ? commonTranslation('common:noAccessibilityInformation')
                    : commonTranslation('common:accessibilityShortcomings', {
                        count: accessibilityShortcomingCount,
                      })}
                </Tag>
              </div>
            )}
            <div className={styles.buttonWrapper}>
              <ArrowRightWithLoadingIndicator
                loading={clicked}
                className={styles.arrowRight}
                size={IconSize.Large}
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
      </LinkBox>
    </div>
  );
};

export default LargeVenueCard;
