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
import useShouldShowAppBackArrow from '../../hooks/useShouldShowAppBackArrow';
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
import { getEnrolmentStatus } from '../../utils/getEventEnrolmentStatus';
import getLocaleFromPathname from '../../utils/getLocaleFromPathname';
import { OPEN_ENROLMENT_STATUSES } from '../domain/event/eventEnrolmentStatus/constants';
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
 * @returns {boolean} Returns `true` if enrolment is open
 *  (either for direct attendance or the waiting list), otherwise `false`.
 */
export const getIsEnrolmentOpen = (
  event?: EventHeroProps['event'],
  superEvent?: EventHeroProps['superEvent'],
  enrolmentFormAvailableBeforeHand = false
): boolean => {
  if (!event || superEvent?.status === 'pending') return false;
  const status = getEnrolmentStatus(event, superEvent?.data ?? undefined);
  if (enrolmentFormAvailableBeforeHand) {
    return [
      ...OPEN_ENROLMENT_STATUSES,
      EnrolmentStatusLabel.enrolmentNotStartedYet,
    ].includes(status);
  }
  return OPEN_ENROLMENT_STATUSES.includes(status);
};

const ShortDescription: React.FC<Pick<EventHeroProps, 'event'>> = ({
  event,
}) => {
  const locale = useLocale();
  const { shortDescription } = getEventFields(event, locale);

  if (!shortDescription) return null;

  return <div className={styles.description}>{shortDescription}</div>;
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
  const { endTime: eventEndTime, startTime: eventStartTime } = getEventFields(
    event,
    locale
  );

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

export const EnrolmentStatusInfo: React.FC<
  Pick<EventHeroProps, 'event' | 'superEvent'>
> = ({ event, superEvent }) => {
  const { status: eventEnrolmentStatus, loading: superEventLoading } =
    useEventEnrolmentStatus(event);
  const hasRegistration =
    !!event.enrolmentStartTime && !!event.enrolmentEndTime;

  const hiddenForStatuses = [
    EnrolmentStatusLabel.noEnrolmentTimes,
    EnrolmentStatusLabel.enrollable,
    EnrolmentStatusLabel.queueable,
  ];

  if (superEvent?.status === 'pending' || superEventLoading) {
    return <SkeletonLoader />;
  }

  if (!hasRegistration || hiddenForStatuses.includes(eventEnrolmentStatus)) {
    // Don't show if there is no registation required or status is "enrollable" or "queueable",
    // because then an enrolment button is shown instead.
    return null;
  }

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

  if (!eventPriceText) return null;

  return (
    <div className={styles.price}>
      <InfoWithIcon icon={<IconTicket aria-hidden />} title={''}>
        {eventPriceText}
      </InfoWithIcon>
    </div>
  );
};

/**
 * Determines whether the enrolment or registration button should be displayed.
 *
 * The button is shown if:
 * 1. An **external registration URL** is provided, AND there is **no enrolment start time** specified
 * (e.g., direct ticket link).
 * OR
 * 2. An **external registration URL** is provided, AND **enrolment is currently open**.
 *
 * @param {object} params - The event enrolment and registration details.
 * @returns {boolean} True if the enrolment/registration button should be visible, otherwise false.
 */
function getShouldShowEnrolmentButton({
  externalRegistrationUrl,
  isEnrolmentOpen,
  enrolmentStartTime,
}: {
  externalRegistrationUrl?: string | null;
  isEnrolmentOpen: boolean;
  enrolmentStartTime?: string | null;
}): boolean {
  // NOTE: Shows the button for direct registration links without an explicit enrolment period.
  const hasRegistrationUrlWithoutEnrolmentTime =
    externalRegistrationUrl && !enrolmentStartTime;
  // NOTE: Shows the button when registration is open and a URL is provided.
  const hasRegistrationUrlAndEnrolmentIsOpen =
    externalRegistrationUrl && isEnrolmentOpen;

  return Boolean(
    hasRegistrationUrlWithoutEnrolmentTime ||
      hasRegistrationUrlAndEnrolmentIsOpen
  );
}

export const OfferButton: React.FC<
  Pick<EventHeroProps, 'event' | 'superEvent'>
> = ({ event, superEvent }) => {
  const locale = useLocale();
  const { t } = useTranslation('event');

  const { defaultButtonTheme: theme, defaultButtonVariant: variant } =
    useAppThemeContext();

  // NOTE: Should something else than offerInfoURl be used here?
  // E.g. event?.registration?.signupUrl? or registration link from from event?.externalLinks?.
  const { offerInfoUrl, registrationUrl, enrolmentStartTime } = getEventFields(
    event,
    locale
  );
  const externalRegistrationUrl = offerInfoUrl || registrationUrl;

  const isEnrolmentOpen = getIsEnrolmentOpen(event, superEvent, true);

  if (superEvent?.status === 'pending') {
    return <SkeletonLoader />;
  }

  const shouldShowEnrolmentButton = getShouldShowEnrolmentButton({
    externalRegistrationUrl,
    isEnrolmentOpen,
    enrolmentStartTime,
  });

  if (!externalRegistrationUrl || !shouldShowEnrolmentButton) {
    return null;
  }

  const buttonText = getEventHeroButtonText(
    event,
    'button',
    t,
    superEvent?.data ?? undefined
  );
  const buttonAriaLabelText = getEventHeroButtonText(
    event,
    'ariaLabel',
    t,
    superEvent?.data ?? undefined
  );

  return (
    <div className={styles.registrationButtonWrapper}>
      <Button
        theme={theme}
        variant={variant}
        className={buttonStyles.buttonCoatBlue}
        aria-label={buttonAriaLabelText}
        onClick={() => window.open(externalRegistrationUrl)}
        iconRight={<IconLinkExternal aria-hidden />}
      >
        {buttonText}
      </Button>
    </div>
  );
};

const ReturnPathNavBackArrow: React.FC = () => {
  const { t } = useTranslation('event');
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
    <IconButton
      role="link"
      ariaLabel={t('hero.ariaLabelBackButton')}
      backgroundColor="white"
      icon={<IconArrowLeft aria-hidden />}
      onClick={() => goBack(returnParam)}
      size="default"
    />
  );
};

const EventHero: React.FC<EventHeroProps> = ({
  event,
  superEvent,
  withActions = true,
}) => {
  const { fallbackImageUrls } = useConfig();
  const locale = useLocale();
  const shouldShowAppBackArrow = useShouldShowAppBackArrow();
  const { imageUrl, keywords, today, thisWeek } = getEventFields(event, locale);

  const showKeywords = Boolean(today || thisWeek || keywords.length);

  return (
    <PageSection className={classNames(styles.heroSection)}>
      <ContentContainer className={styles.contentContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.backButtonWrapper}>
            {shouldShowAppBackArrow && <ReturnPathNavBackArrow />}
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
                  <EnrolmentStatusInfo event={event} superEvent={superEvent} />
                  <OfferButton event={event} superEvent={superEvent} />
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
