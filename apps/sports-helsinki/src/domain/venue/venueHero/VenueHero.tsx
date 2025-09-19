import type { Venue } from '@events-helsinki/components';
import {
  useLocale,
  EllipsedTextWithToggle,
  getSecureImage,
  isVenueHelsinkiCityOwned,
  HelsinkiCityOwnedIcon,
} from '@events-helsinki/components';
import classNames from 'classnames';
import { IconClock, IconLocation, IconTicket } from 'hds-react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import {
  BackgroundImage,
  ContentContainer,
  PageSection,
  useConfig,
} from 'react-helsinki-headless-cms';

import getVenueOpeningTimeDescription from '../utils/getVenueOpeningTimeDescription';
import VenueKeywords from '../venueKeywords/VenueKeywords';
import styles from './venueHero.module.scss';

export interface Props {
  venue: Venue;
}

const VenueHero: React.FC<Props> = ({ venue }) => {
  const { t: commonTranslation } = useTranslation('common');
  const { fallbackImageUrls } = useConfig();
  const locale = useLocale();

  const isHelsinkiCityOwned = isVenueHelsinkiCityOwned(venue);
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
              className={styles.ellipsedText}
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

  return (
    <PageSection className={classNames(styles.heroSection)}>
      <ContentContainer className={styles.contentContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.leftEmpty} />
          <div>
            <BackgroundImage
              className={styles.image}
              id={`venue-background-${venue.id}`}
              url={imageUrl || fallbackImageUrls[0]}
            />
          </div>
          <div className={styles.leftPanel}>
            <div className={styles.leftPanelWrapper}>
              <div className={styles.leftPanelEmpty} />
              <div className={styles.textWrapper}>
                <div>
                  <VenueKeywords whiteOnly venue={venue} />
                </div>
                <h1 className={styles.title}>
                  {venue.name}
                  {isHelsinkiCityOwned && <HelsinkiCityOwnedIcon />}
                </h1>
                <div className={styles.additionalInfo}>
                  <div className={styles.location}>
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
                  </div>
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
