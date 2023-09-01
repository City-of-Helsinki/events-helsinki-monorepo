import type { Venue } from '@events-helsinki/components';
import {
  InfoWithIcon,
  useVenueTranslation,
  useCommonTranslation,
  useTabFocusStyle,
  EllipsedTextWithToggle,
  isVenueHelsinkiCityOwned,
  useAppRoutingContext,
  useLocale,
} from '@events-helsinki/components';
import {
  IconCheckCircleFill,
  IconClock,
  IconCompany,
  IconInfoCircle,
  IconMap,
  IconPhone,
} from 'hds-react';
import { useRouter } from 'next/router';
import React from 'react';
import { SecondaryLink } from 'react-helsinki-headless-cms';
import {
  getGoogleDirectionsUrl,
  getHSLDirectionsUrl,
  getVenueDirectionPoint,
} from '../utils/getVenueDirections';
import styles from './venueInfo.module.scss';

const OpeningHoursInfo = ({ venue: { connections } }: { venue: Venue }) => {
  const { t } = useVenueTranslation();
  const sectionTypes = ['OPENING_HOURS', 'OPENING_HOUR_OBJECT'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const connectionOpeningHoursSectionsContents: any[] = connections
    ?.filter((item) => sectionTypes.includes(item?.sectionType || ''))
    ?.map((item) => item?.name);
  const connectionOpeningHoursSectionsLines =
    connectionOpeningHoursSectionsContents.join('\n\n').split('\n');

  if (connectionOpeningHoursSectionsContents.length > 0) {
    return (
      <InfoWithIcon
        icon={<IconClock aria-hidden="true" />}
        title={t('venue:info.labelOpeningHours')}
      >
        <EllipsedTextWithToggle
          lines={connectionOpeningHoursSectionsLines}
          initialVisibleLinesCount={10}
        />
      </InfoWithIcon>
    );
  }
  return null;
};

const ContactDetailsInfo = ({
  venue: { email, telephone, connections },
}: {
  venue: Venue;
}) => {
  const { t } = useVenueTranslation();
  const contactDetailsSectionsContents = connections?.filter(
    (item) => item?.sectionType === 'PHONE_OR_EMAIL'
  );
  const hasContactDetails = Boolean(
    email || telephone || contactDetailsSectionsContents?.length > 0
  );

  if (hasContactDetails) {
    return (
      <InfoWithIcon
        icon={<IconPhone aria-hidden="true" />}
        title={t('venue:info.labelContactDetails')}
      >
        <ul key="contact-details-main" className={styles.list}>
          {telephone && <li>{telephone}</li>}
          {email && <li>{email}</li>}
        </ul>
        {contactDetailsSectionsContents?.map((contact, i) => (
          <ul key={`contact-details-other-${i}`} className={styles.list}>
            {contact?.name && <li>{contact.name}</li>}
            {contact?.phone && <li>{contact.phone}</li>}
          </ul>
        ))}
      </InfoWithIcon>
    );
  }
  return null;
};

const VenueInformationLinksContainer = ({
  venue: { infoUrl, connections },
}: {
  venue: Venue;
}) => {
  const { t } = useVenueTranslation();

  const otherInformationLinksContents =
    connections?.filter((item) => item?.url && item.sectionType === 'LINK') ||
    [];
  if (infoUrl || otherInformationLinksContents.length > 0) {
    return (
      <InfoWithIcon
        icon={<IconInfoCircle aria-hidden="true" />}
        title={t('venue:info.labelVenueInformationLinks')}
      >
        {infoUrl && (
          <SecondaryLink className={styles.link} href={infoUrl}>
            {t('venue:info.link.website')}
          </SecondaryLink>
        )}
        {otherInformationLinksContents.map((connection) => (
          <SecondaryLink
            key={connection?.url}
            className={styles.link}
            href={connection?.url ?? ''}
          >
            {connection?.name}
          </SecondaryLink>
        ))}
      </InfoWithIcon>
    );
  }
  return null;
};

const VenueRouteInfo = ({ venue }: { venue: Venue }) => {
  const { t } = useVenueTranslation();

  // Data that can't be found from the API at this point
  const directionPoint = getVenueDirectionPoint(venue);

  return (
    <InfoWithIcon
      icon={<IconMap aria-hidden="true" />}
      title={t('venue:info.labelRoute')}
    >
      <SecondaryLink
        className={styles.link}
        href={getHSLDirectionsUrl(null, directionPoint)}
      >
        {t('venue:location.directionsHSL')}
      </SecondaryLink>
      <SecondaryLink
        className={styles.link}
        href={getGoogleDirectionsUrl(null, directionPoint)}
      >
        {t('venue:location.directionsGoogle')}
      </SecondaryLink>
    </InfoWithIcon>
  );
};

const ServiceOwnerInfo = ({ venue }: { venue: Venue }) => {
  const { t } = useVenueTranslation();
  const { t: commonT } = useCommonTranslation();
  const { getHelsinkiOnlySearchUrl } = useAppRoutingContext();
  const locale = useLocale();
  const router = useRouter();
  const isHelsinkiCityOwned = isVenueHelsinkiCityOwned(venue);
  const cleanedServiceOwnerName = venue?.displayedServiceOwner
    ?.replaceAll(
      // remove unnecessary prefixes
      /^(?:kunnallinen palvelu|kommunal tjänst|municipal service), /gi,
      ''
    )
    .replaceAll(
      // remove unnecessary suffixes
      /, (?:Helsingin kaupunki|Helsingfors stad|City of Helsinki)$/gi,
      ''
    );

  return (
    <InfoWithIcon
      icon={<IconCompany />}
      title={t('info.labelResponsibleForVenue')}
    >
      <>
        {isHelsinkiCityOwned && (
          <div className={styles.helsinkiCityOwnedText}>
            {commonT('common:cityOfHelsinki')}
            <IconCheckCircleFill
              className={styles.helsinkiCityOwnedIcon}
              aria-hidden
            />
          </div>
        )}
        <div>{cleanedServiceOwnerName}</div>
        {isHelsinkiCityOwned && (
          <SecondaryLink
            data-testid="helsinkiOnlyLink"
            className={styles.link}
            variant="arrowRight"
            href={getHelsinkiOnlySearchUrl(venue, router, locale)}
          >
            {t('info.link.searchByHelsinkiOnly')}
          </SecondaryLink>
        )}
      </>
    </InfoWithIcon>
  );
};

const VenueInfo = ({ venue }: { venue: Venue }) => {
  const venueInfoContainer = React.useRef<HTMLDivElement | null>(null);
  useTabFocusStyle({
    container: venueInfoContainer,
    className: styles.focusVisible,
  });
  return (
    <div className={styles.venueInfo} ref={venueInfoContainer}>
      <div className={styles.contentWrapper}>
        <OpeningHoursInfo venue={venue} />
        <ContactDetailsInfo venue={venue} />
        <VenueInformationLinksContainer venue={venue} />
        <VenueRouteInfo venue={venue} />
        <ServiceOwnerInfo venue={venue} />
      </div>
    </div>
  );
};

export default VenueInfo;
