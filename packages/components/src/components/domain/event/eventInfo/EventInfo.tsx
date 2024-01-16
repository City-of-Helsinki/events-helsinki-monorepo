import * as Sentry from '@sentry/browser';
import { saveAs } from 'file-saver';
import {
  Button,
  IconAngleRight,
  IconCalendarClock,
  IconGlobe,
  IconGroup,
  IconInfoCircle,
  IconLocation,
  IconTicket,
} from 'hds-react';
import type { EventAttributes } from 'ics';
import { createEvent } from 'ics';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { SecondaryLink } from 'react-helsinki-headless-cms';

import IconDirections from '../../../../assets/icons/IconDirections';
import InfoWithIcon from '../../../../components/infoWithIcon/InfoWithIcon';
import Visible from '../../../../components/visible/Visible';
import useLocale from '../../../../hooks/useLocale';
import useTabFocusStyle from '../../../../hooks/useTabFocusStyle';
import { useAppRoutingContext } from '../../../../routingUrlProvider';
import { useAppThemeContext } from '../../../../themeProvider';
import type {
  EventFields,
  KeywordOption,
  SuperEventResponse,
} from '../../../../types/event-types';
import {
  getAudienceAgeText,
  getEventFields,
  getEventPrice,
  getServiceMapUrl,
} from '../../../../utils/eventUtils';
import getDateArray from '../../../../utils/getDateArray';
import getDateRangeStr from '../../../../utils/getDateRangeStr';
import getDomain from '../../../../utils/getDomain';
import { translateValue } from '../../../../utils/translateUtils';
import styles from './eventInfo.module.scss';
import { SubEvents, SuperEvent } from './EventsHierarchy';
import OrganizationInfo from './OrganizationInfo';
import OtherEventTimes from './OtherEventTimes';

export type EventInfoProps = {
  event: EventFields;
  superEvent?: SuperEventResponse;
};

const EventInfo: React.FC<EventInfoProps> = ({ event, superEvent }) => {
  const locale = useLocale();
  const eventInfoContainer = React.useRef<HTMLDivElement | null>(null);
  useTabFocusStyle({
    container: eventInfoContainer,
    className: styles.focusVisible,
  });
  const {
    externalLinks,
    infoUrl,
    languages,
    providerContactInfo,
    audience,
    audienceMinAge,
    audienceMaxAge,
  } = getEventFields(event, locale);
  const showOtherInfo = Boolean(
    providerContactInfo || externalLinks.length || infoUrl
  );
  /*
  Middle level events are all the events that have super event and subEvents
  Then the so called sibbling events (the events that have the same super event)
  are not wanted to be seen.
  */
  const isMiddleLevelEvent = Boolean(superEvent && event.subEvents?.length);

  return (
    <div className={styles.eventInfo} ref={eventInfoContainer}>
      <div className={styles.contentWrapper}>
        <DateInfo event={event} />
        <SuperEvent superEvent={superEvent} />
        <SubEvents event={event} />
        {!isMiddleLevelEvent && <OtherEventTimes event={event} />}
        <LocationInfo event={event} />
        {(!!audience.length || !!audienceMinAge || !!audienceMaxAge) && (
          <Audience
            audience={audience}
            audienceMinAge={audienceMinAge}
            audienceMaxAge={audienceMaxAge}
          />
        )}
        {!!languages.length && <Languages languages={languages} />}
        {showOtherInfo && <OtherInfo event={event} />}
        <Directions event={event} />
        <OrganizationInfo event={event} />
        <PriceInfo event={event} />
      </div>
    </div>
  );
};

const DateInfo: React.FC<{
  event: EventFields;
}> = ({ event }) => {
  const { t } = useTranslation('event');
  const { t: commonTranslation } = useTranslation('common');
  const locale = useLocale();
  const { getPlainEventUrl } = useAppRoutingContext();
  const {
    addressLocality,
    district,
    endTime,
    locationName,
    name,
    shortDescription,
    startTime,
    streetAddress,
  } = getEventFields(event, locale);

  const downloadIcsFile = () => {
    if (startTime) {
      const domain = getDomain();
      const icsEvent: EventAttributes = {
        description: t('info.textCalendarLinkDescription', {
          description: shortDescription,
          link: `${domain}${getPlainEventUrl(event, locale)}`,
        }),
        end: endTime ? getDateArray(endTime) : getDateArray(startTime),
        location: [locationName, streetAddress, district, addressLocality]
          .filter((e) => e)
          .join(', '),
        productId: domain,
        start: getDateArray(startTime),
        startOutputType: 'local',
        title: name,
      };
      // FIXME: When ran with Jest, this throws an error!
      createEvent(icsEvent, (error: Error | undefined, value: string) => {
        if (error) {
          Sentry.captureException(error);
        } else {
          const blob = new Blob([value], { type: 'text/calendar' });
          saveAs(blob, `event_${event.id.replace(/:/g, '')}.ics`);
        }
      });
    }
  };

  return (
    <InfoWithIcon
      icon={<IconCalendarClock aria-hidden />}
      title={t('info.labelDateAndTime')}
    >
      {!!startTime && (
        <>
          {getDateRangeStr({
            start: startTime,
            end: endTime,
            locale,
            includeTime: true,
            timeAbbreviation: commonTranslation('timeAbbreviation'),
          })}
          <button onClick={downloadIcsFile}>
            {t('info.buttonAddToCalendar')}
            <IconAngleRight aria-hidden />
          </button>
        </>
      )}
    </InfoWithIcon>
  );
};

const LocationInfo: React.FC<{ event: EventFields }> = ({ event }) => {
  const { t } = useTranslation('event');
  const locale = useLocale();

  const { addressLocality, district, locationName, streetAddress } =
    getEventFields(event, locale);

  const serviceMapUrl = getServiceMapUrl(event, locale, false);

  return (
    <InfoWithIcon
      icon={<IconLocation aria-hidden />}
      title={t('info.labelLocation')}
    >
      <Visible below="s">
        {[locationName, streetAddress, district, addressLocality]
          .filter((e) => e)
          .join(', ')}
      </Visible>
      <Visible above="s">
        {[locationName, streetAddress, district, addressLocality]
          .filter((e) => e)
          .map((item) => {
            return <div key={item}>{item}</div>;
          })}
      </Visible>
      {serviceMapUrl && (
        <SecondaryLink
          className={styles.link}
          showExternalIcon={false}
          variant="arrowRight"
          href={serviceMapUrl}
        >
          {t('info.openMap')}
        </SecondaryLink>
      )}
    </InfoWithIcon>
  );
};

const Audience: React.FC<{
  audience: KeywordOption[];
  audienceMinAge?: string | null;
  audienceMaxAge?: string | null;
}> = ({ audience, audienceMinAge, audienceMaxAge }) => {
  const { t } = useTranslation('event');

  return (
    <InfoWithIcon icon={<IconGroup />} title={t('info.labelAudience')}>
      {(audienceMinAge || audienceMaxAge) && (
        <div>{getAudienceAgeText(t, audienceMinAge, audienceMaxAge)}</div>
      )}
      {audience.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </InfoWithIcon>
  );
};

const Languages: React.FC<{ languages: string[] }> = ({ languages }) => {
  const { t } = useTranslation('event');

  return (
    <InfoWithIcon
      icon={<IconGlobe aria-hidden />}
      title={t('info.labelLanguages')}
    >
      <div>{languages.join(', ')}</div>
    </InfoWithIcon>
  );
};

const OtherInfo: React.FC<{
  event: EventFields;
}> = ({ event }) => {
  const { t } = useTranslation('event');
  const locale = useLocale();

  const { externalLinks, infoUrl, registrationUrl, providerContactInfo } =
    getEventFields(event, locale);

  return (
    <InfoWithIcon
      icon={<IconInfoCircle aria-hidden />}
      title={t('info.labelOtherInfo')}
    >
      {providerContactInfo && <div>{providerContactInfo}</div>}

      {infoUrl && (
        <SecondaryLink
          variant="arrowRight"
          className={styles.link}
          href={infoUrl}
          showExternalIcon={false}
        >
          {t('info.linkWebPage')}
        </SecondaryLink>
      )}
      {externalLinks.map(
        (
          externalLink: { link?: string | null; name?: string | null },
          index: number
        ) => {
          return (
            !!externalLink.link &&
            !!externalLink.name &&
            externalLink.link !== registrationUrl && (
              <SecondaryLink
                className={styles.link}
                key={`externalLink-${index}`}
                href={externalLink.link}
              >
                {translateValue('info.', externalLink.name, t)}
              </SecondaryLink>
            )
          );
        }
      )}
    </InfoWithIcon>
  );
};

const Directions: React.FC<{
  event: EventFields;
}> = ({ event }) => {
  const { t } = useTranslation('event');
  const locale = useLocale();

  const { googleDirectionsLink, hslDirectionsLink } = getEventFields(
    event,
    locale
  );

  return (
    <InfoWithIcon
      icon={<IconDirections aria-hidden />}
      title={t('info.labelDirections')}
    >
      <SecondaryLink className={styles.link} href={googleDirectionsLink}>
        {t('info.directionsGoogle')}
      </SecondaryLink>
      <SecondaryLink className={styles.link} href={hslDirectionsLink}>
        {t('info.directionsHSL')}
      </SecondaryLink>
    </InfoWithIcon>
  );
};

const PriceInfo: React.FC<{
  event: EventFields;
}> = ({ event }) => {
  const { t } = useTranslation('event');
  const { defaultButtonTheme: theme, defaultButtonVariant: variant } =
    useAppThemeContext();
  const locale = useLocale();
  const eventPriceText = getEventPrice(event, locale, t('info.offers.isFree'));
  const { offerInfoUrl } = getEventFields(event, locale);
  const moveToBuyTicketsPage = () => {
    window.open(offerInfoUrl);
  };
  return (
    <>
      {/* Price info */}
      <Visible below="s">
        <InfoWithIcon
          icon={<IconTicket aria-hidden />}
          title={t('info.labelPrice')}
        >
          {eventPriceText || '-'}
        </InfoWithIcon>
      </Visible>

      {offerInfoUrl && (
        <Visible below="s" className={styles.buyButtonWrapper}>
          <Button
            theme={theme}
            variant={variant}
            aria-label={t('info.ariaLabelBuyTickets')}
            fullWidth={true}
            onClick={moveToBuyTicketsPage}
          >
            {t('info.buttonBuyTickets')}
          </Button>
        </Visible>
      )}
    </>
  );
};

export default EventInfo;
