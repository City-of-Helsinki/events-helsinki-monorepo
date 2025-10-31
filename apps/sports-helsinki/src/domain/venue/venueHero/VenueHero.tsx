import type { Venue } from '@events-helsinki/components';
import {
  useLocale,
  IconButton,
  EllipsedTextWithToggle,
  getSecureImage,
  useVenueTranslation,
  getLocaleFromPathname,
  isVenueHelsinkiCityOwned,
  HelsinkiCityOwnedIcon,
} from '@events-helsinki/components';
import type { ReturnParams } from '@events-helsinki/components/utils/eventQueryString.util';
import { extractLatestReturnPath } from '@events-helsinki/components/utils/eventQueryString.util';
import classNames from 'classnames';
import { IconArrowLeft, IconClock, IconLocation, IconTicket } from 'hds-react';
import { useRouter } from 'next/router';
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

const ReturnPathNavBackArrow: React.FC = () => {
  const { t } = useVenueTranslation();
  const locale = useLocale();
  const router = useRouter();
  const search = router.asPath.split('?')[1];
  const returnParam = extractLatestReturnPath(search, `/${locale}`);

  const goBack = ({ returnPath, remainingQueryString = '' }: ReturnParams) => {
    const goBackUrl = `${
      returnPath.startsWith('/') ? '' : '/'
    }${returnPath}${remainingQueryString}`;
    const goBackUrlLocale = getLocaleFromPathname(goBackUrl);
    router.push(goBackUrl, undefined, { locale: goBackUrlLocale });
  };

  return (
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
  );
};

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
          <ReturnPathNavBackArrow />
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
