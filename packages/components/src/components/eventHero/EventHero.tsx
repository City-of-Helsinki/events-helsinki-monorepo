import classNames from 'classnames';
import {
  Button,
  IconArrowLeft,
  IconBell,
  IconCalendarClock,
  IconLinkExternal,
  IconLocation,
  IconTicket,
} from 'hds-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import {
  BackgroundImage,
  ContentContainer,
  PageSection,
  useConfig,
} from 'react-helsinki-headless-cms';

import buttonStyles from '../../components/button/button.module.scss';
import {
  EventEnrolmentStatus,
  useEventEnrolmentStatus,
} from '../../components/domain/event/eventEnrolmentStatus';
import EventLocationText from '../../components/domain/event/eventLocation/EventLocationText';
import EventKeywords from '../../components/eventKeywords/EventKeywords';
import EventName from '../../components/eventName/EventName';
import IconButton from '../../components/iconButton/IconButton';
import InfoWithIcon from '../../components/infoWithIcon/InfoWithIcon';
import SkeletonLoader from '../../components/skeletonLoader/SkeletonLoader';
import { EnrolmentStatusLabel } from '../../constants';
import useLocale from '../../hooks/useLocale';
import { useAppThemeContext } from '../../themeProvider';
import type { EventFields, SuperEventResponse } from '../../types/event-types';
import { extractLatestReturnPath } from '../../utils/eventQueryString.util';
import type { ReturnParams } from '../../utils/eventQueryString.util';
import {
  getEventFields,
  getEventHeroButtonText,
  getEventPrice,
} from '../../utils/eventUtils';
import getDateRangeStr from '../../utils/getDateRangeStr';
import getLocaleFromPathname from '../../utils/getLocaleFromPathname';
import styles from './eventHero.module.scss';

export type EventHeroProps = {
  event: EventFields;
  superEvent?: SuperEventResponse;
  withActions?: boolean;
};

/**
 * Determine if event enrolment is open. This hook evaluates whether a user
 * can still sign up for an event. Enrolment is considered open if there is
 * remaining capacity for attendees, or if a waiting list exists and it has
 * available spots.
 *
 * @param {EventHeroProps['event']} event - The event object containing
 *  details about attendee and waiting list capacities.
 * @returns {boolean} Returns `true` if enrolment is open
 *  (either for direct attendance or the waiting list), otherwise `false`.
 */
const useIsEnrolmentOpen = (event: EventHeroProps['event']) => {
  const {
    remainingAttendeeCapacity,
    waitingListCapacity,
    remainingWaitingListCapacity,
  } = event.registration ?? {};

  return (
    !!remainingAttendeeCapacity ||
    (waitingListCapacity && remainingWaitingListCapacity)
  );
};

const ShortDescription: React.FC<Pick<EventHeroProps, 'event'>> = ({
  event,
}) => {
  const locale = useLocale();
  const { shortDescription } = getEventFields(event, locale);
  return (
    <>
      {shortDescription && (
        <div className={styles.description}>{shortDescription}</div>
      )}
    </>
  );
};

const LocationInfo: React.FC<Pick<EventHeroProps, 'event'>> = ({ event }) => (
  <div className={styles.location}>
    <InfoWithIcon icon={<IconLocation aria-hidden />} title={''}>
      <EventLocationText
        event={event}
        showNeighborhood={false}
        showLocationName={true}
      />
    </InfoWithIcon>
  </div>
);

const TimeInfo: React.FC<Pick<EventHeroProps, 'event' | 'superEvent'>> = ({
  event,
  superEvent,
}) => {
  const { t: commonTranslation } = useTranslation('common');
  const locale = useLocale();
  const {
    endTime: eventEndTime,

    startTime: eventStartTime,
  } = getEventFields(event, locale);

  return (
    <div className={styles.start}>
      <InfoWithIcon icon={<IconCalendarClock aria-hidden />} title={''}>
        {superEvent?.status === 'pending' ? (
          <SkeletonLoader />
        ) : (
          getDateRangeStr({
            start: eventStartTime || '',
            end: eventEndTime,
            locale,
            includeTime: true,
            timeAbbreviation: commonTranslation('timeAbbreviation'),
          })
        )}
      </InfoWithIcon>
    </div>
  );
};

const EnrolmentStatusInfo: React.FC<Pick<EventHeroProps, 'event'>> = ({
  event,
}) => {
  const { status: eventEnrolmentStatus } = useEventEnrolmentStatus(event);
  const hasRegistration =
    !!event.enrolmentStartTime && !!event.enrolmentEndTime;

  if (!hasRegistration) return null;

  return (
    <div className={styles.enrolmentStatus}>
      <InfoWithIcon icon={<IconBell aria-hidden />} title={''}>
        <EventEnrolmentStatus
          event={event}
          className={classNames({
            [styles.alert]: eventEnrolmentStatus === EnrolmentStatusLabel.full,
          })}
        />
      </InfoWithIcon>
    </div>
  );
};

const EventPriceInfo: React.FC<Pick<EventHeroProps, 'event'>> = ({ event }) => {
  const locale = useLocale();
  const { t } = useTranslation('event');
  const eventPriceText = getEventPrice(event, locale, t('hero.offers.isFree'));

  return (
    <>
      {eventPriceText && (
        <div className={styles.price}>
          <InfoWithIcon icon={<IconTicket aria-hidden />} title={''}>
            {eventPriceText}
          </InfoWithIcon>
        </div>
      )}
    </>
  );
};

const OfferButton: React.FC<Pick<EventHeroProps, 'event'>> = ({ event }) => {
  const locale = useLocale();
  const { t } = useTranslation('event');

  const { defaultButtonTheme: theme, defaultButtonVariant: variant } =
    useAppThemeContext();

  const { offerInfoUrl } = getEventFields(event, locale);

  const isEnrolmentOpen = useIsEnrolmentOpen(event);

  const buttonText = getEventHeroButtonText(event, 'button', t);
  const buttonAriaLabelText = getEventHeroButtonText(event, 'ariaLabel', t);
  return (
    <>
      {offerInfoUrl && isEnrolmentOpen && (
        <div className={styles.registrationButtonWrapper}>
          <Button
            theme={theme}
            variant={variant}
            className={buttonStyles.buttonCoatBlue}
            aria-label={buttonAriaLabelText}
            onClick={() => window.open(offerInfoUrl)}
            iconRight={<IconLinkExternal aria-hidden />}
          >
            {buttonText}
          </Button>
        </div>
      )}
    </>
  );
};

const EventHero: React.FC<EventHeroProps> = ({
  event,
  superEvent,
  withActions = true,
}) => {
  const { t } = useTranslation('event');
  const { fallbackImageUrls } = useConfig();
  const locale = useLocale();
  const router = useRouter();
  const search = router.asPath.split('?')[1];

  const { imageUrl, keywords, today, thisWeek } = getEventFields(event, locale);

  const showKeywords = Boolean(today || thisWeek || keywords.length);
  const returnParam = extractLatestReturnPath(search, `/${locale}`);

  const goBack = ({ returnPath, remainingQueryString = '' }: ReturnParams) => {
    const goBackUrl = `${
      returnPath.startsWith('/') ? '' : '/'
    }${returnPath}${remainingQueryString}`;
    const goBackUrlLocale = getLocaleFromPathname(goBackUrl);
    router.push(goBackUrl, undefined, { locale: goBackUrlLocale });
  };

  return (
    <PageSection className={classNames(styles.heroSection)}>
      <ContentContainer className={styles.contentContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.backButtonWrapper}>
            <IconButton
              role="link"
              ariaLabel={t('hero.ariaLabelBackButton')}
              backgroundColor="white"
              icon={<IconArrowLeft aria-hidden />}
              onClick={() => goBack(returnParam)}
              size="default"
            />
          </div>
          <div>
            <BackgroundImage
              className={styles.image}
              id={`event-background-${event.id}`}
              url={imageUrl || fallbackImageUrls[0]}
            />
          </div>
          <div className={styles.leftPanel}>
            <div className={styles.leftPanelWrapper}>
              <div className={styles.leftPanelEmpty} />
              <div className={styles.textWrapper}>
                <h1 className={styles.title} data-testid="event-name">
                  <EventName event={event} />
                </h1>
                <ShortDescription event={event} />

                <div className={styles.additionalInfo}>
                  <TimeInfo event={event} superEvent={superEvent} />
                  <LocationInfo event={event} />
                  <EventPriceInfo event={event} />
                  <EnrolmentStatusInfo event={event} />
                  <OfferButton event={event} />
                </div>
                {showKeywords && (
                  <div className={styles.categoryWrapper}>
                    <EventKeywords
                      whiteOnly
                      event={event}
                      showIsFree={true}
                      withActions={Boolean(withActions)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </PageSection>
  );
};

export default EventHero;
