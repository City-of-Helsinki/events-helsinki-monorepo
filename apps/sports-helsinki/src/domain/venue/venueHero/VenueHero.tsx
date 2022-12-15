import classNames from 'classnames';
import type { Venue } from 'events-helsinki-components';
import {
  Visible,
  useLocale,
  IconButton,
  EllipsedTextWithToggle,
  getSecureImage,
  useVenueTranslation,
} from 'events-helsinki-components';
import { IconArrowLeft, IconClock, IconLocation, IconTicket } from 'hds-react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import {
  BackgroundImage,
  ContentContainer,
  PageSection,
} from 'react-helsinki-headless-cms';
import type { ReturnParams } from '../../event/eventQueryString.util';
import { extractLatestReturnPath } from '../../event/eventQueryString.util';
import getVenueOpeningTimeDescription from '../utils/getVenueOpeningTimeDescription';
import VenueKeywords from '../venueKeywords/VenueKeywords';
import styles from './venueHero.module.scss';

const heroPlaceholderImage = '/shared-assets/images/no_image.svg';

export interface Props {
  venue: Venue;
}

const VenueHero: React.FC<Props> = ({ venue }) => {
  const { t } = useVenueTranslation();
  const { t: commonTranslation } = useTranslation('common');
  const locale = useLocale();
  const router = useRouter();
  const search = router.asPath.split('?')[1];
  const returnParam = extractLatestReturnPath(search, locale);

  const goBack = ({ returnPath, remainingQueryString }: ReturnParams) => {
    router.push(
      `${returnPath}${remainingQueryString ? `?${remainingQueryString}` : ''}`
    );
  };

  const imageUrl = venue.image ? getSecureImage(venue.image) : '';
  const { streetAddress, addressLocality, connections, openingHours } = venue;
  const openingHoursNow = openingHours
    ? getVenueOpeningTimeDescription(openingHours, locale, commonTranslation)
    : null;
  const simplifiedAddress = [streetAddress, addressLocality].join(', ');
  const connectionPriceSectionsContents = connections
    ?.filter((item) => item?.sectionType === 'PRICE')
    ?.map((item) => item?.name);
  const connectionPriceSectionsLines = connectionPriceSectionsContents
    .join('\n\n')
    .split('\n');
  const infoLines = [
    {
      id: 'address',
      icon: <IconLocation aria-hidden="true" />,
      info: simplifiedAddress,
    },
    connectionPriceSectionsContents.length > 0
      ? {
          id: 'price',
          icon: <IconTicket aria-hidden="true" />,
          info: (
            <EllipsedTextWithToggle
              lines={connectionPriceSectionsLines}
              initialVisibleLinesCount={4}
            />
          ),
        }
      : null,
    openingHoursNow
      ? {
          id: 'openingHoursNow',
          icon: <IconClock aria-hidden="true" />,
          info: openingHoursNow,
        }
      : null,
  ].filter((item) => Boolean(item));

  const heroImage = imageUrl || heroPlaceholderImage;

  return (
    <PageSection className={classNames(styles.heroSection)}>
      <ContentContainer className={styles.contentContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.backButtonWrapper}>
            <IconButton
              role="link"
              ariaLabel={t('venue:hero.ariaLabelBackButton')}
              backgroundColor="white"
              icon={<IconArrowLeft aria-hidden />}
              onClick={() => goBack(returnParam)}
              size="default"
            />
          </div>
          {heroImage && (
            <div>
              <BackgroundImage
                className={styles.image}
                id={`venue-background-${venue.id}`}
                url={heroImage}
              />
            </div>
          )}
          <div className={styles.leftPanel}>
            <div className={styles.leftPanelWrapper}>
              <div className={styles.leftPanelEmpty} />
              <div className={styles.textWrapper}>
                <div aria-label={t('venue:hero.ariaLabelBackButton')}>
                  <VenueKeywords venue={venue} />
                </div>
                <h1 className={styles.title}>{venue.name}</h1>
                <div className={styles.additionalInfo}>
                  <Visible above="s" className={styles.location}>
                    <ul className={styles.headerInfoLines}>
                      {infoLines.map((infoLine) => (
                        <li
                          key={infoLine?.id}
                          className={styles.headerInfoLine}
                        >
                          {infoLine?.icon} {infoLine?.info}
                        </li>
                      ))}
                    </ul>
                  </Visible>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </PageSection>
  );
};

export default VenueHero;
