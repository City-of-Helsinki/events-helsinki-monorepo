import classNames from 'classnames';
import {
  Button,
  IconArrowLeft,
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

import { EventKeywords, buttonStyles } from '../../components';
import EventLocationText from '../../components/domain/event/eventLocation/EventLocationText';
import EventName from '../../components/eventName/EventName';
import IconButton from '../../components/iconButton/IconButton';
import InfoWithIcon from '../../components/infoWithIcon/InfoWithIcon';
import SkeletonLoader from '../../components/skeletonLoader/SkeletonLoader';
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

// eslint-disable-next-line sonarjs/cognitive-complexity
const EventHero: React.FC<EventHeroProps> = ({
  event,
  superEvent,
  withActions = true,
}) => {
  const { t } = useTranslation('event');
  const { t: commonTranslation } = useTranslation('common');
  const { fallbackImageUrls } = useConfig();
  const locale = useLocale();
  const router = useRouter();
  const search = router.asPath.split('?')[1];
  const { defaultButtonTheme: theme, defaultButtonVariant: variant } =
    useAppThemeContext();

  const {
    endTime: eventEndTime,
    imageUrl,
    keywords,
    offerInfoUrl,
    shortDescription,
    startTime: eventStartTime,
    today,
    thisWeek,
  } = getEventFields(event, locale);
  const eventPriceText = getEventPrice(event, locale, t('hero.offers.isFree'));
  const buttonText = getEventHeroButtonText(event, 'button', t);
  const buttonAriaLabelText = getEventHeroButtonText(event, 'ariaLabel', t);
  const showKeywords = Boolean(today || thisWeek || keywords.length);
  const returnParam = extractLatestReturnPath(search, `/${locale}`);

  const goBack = ({ returnPath, remainingQueryString = '' }: ReturnParams) => {
    const goBackUrl = `${
      returnPath.startsWith('/') ? '' : '/'
    }${returnPath}${remainingQueryString}`;
    const goBackUrlLocale = getLocaleFromPathname(goBackUrl);
    router.push(goBackUrl, undefined, { locale: goBackUrlLocale });
  };

  const startTime =
    superEvent?.status === 'pending'
      ? ''
      : superEvent?.data?.startTime || eventStartTime;
  const endTime =
    superEvent?.status === 'pending'
      ? ''
      : superEvent?.data?.endTime || eventEndTime;

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
                {shortDescription && (
                  <div className={styles.description}>{shortDescription}</div>
                )}
                <div className={styles.additionalInfo}>
                  <div className={styles.location}>
                    <InfoWithIcon
                      icon={<IconLocation aria-hidden />}
                      title={''}
                    >
                      <EventLocationText
                        event={event}
                        showNeighborhood={false}
                        showLocationName={true}
                      />
                    </InfoWithIcon>
                  </div>
                  <div className={styles.start}>
                    {(startTime !== eventStartTime ||
                      endTime !== eventEndTime) && (
                      <InfoWithIcon
                        icon={<IconCalendarClock aria-hidden />}
                        title={''}
                      >
                        {superEvent?.status === 'pending' ? (
                          <SkeletonLoader />
                        ) : (
                          getDateRangeStr({
                            start: eventStartTime || '',
                            end: eventEndTime,
                            locale,
                            includeTime: true,
                            timeAbbreviation:
                              commonTranslation('timeAbbreviation'),
                          })
                        )}
                      </InfoWithIcon>
                    )}
                  </div>
                  {eventPriceText && (
                    <div className={styles.price}>
                      <InfoWithIcon
                        icon={<IconTicket aria-hidden />}
                        title={''}
                      >
                        {eventPriceText}
                      </InfoWithIcon>
                    </div>
                  )}
                  {offerInfoUrl && (
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
