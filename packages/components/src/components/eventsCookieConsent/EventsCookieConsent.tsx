import type { ContentSource } from 'hds-react';
import { CookieModal } from 'hds-react';
import React from 'react';
import { MAIN_CONTENT_ID } from '../../constants';
import { useConsentTranslation } from '../../hooks';
import useLocale from '../../hooks/useLocale';

type Props = {
  appName: string;
  allowLanguageSwitch?: boolean;
};

const EventsCookieConsent: React.FC<Props> = ({
  appName,
  allowLanguageSwitch = true,
}) => {
  const locale = useLocale();
  const { t, i18n } = useConsentTranslation();
  const [language, setLanguage] =
    React.useState<ContentSource['currentLanguage']>(locale);

  const [showCookieConsentModal, setShowCookieConsentModal] =
    React.useState(true);

  const onLanguageChange = React.useCallback(
    (newLang: string) => {
      if (allowLanguageSwitch) {
        setLanguage(newLang as ContentSource['currentLanguage']);
        i18n.changeLanguage(newLang);
      }
    },
    [i18n, setLanguage, allowLanguageSwitch]
  );
  const contentSource: ContentSource = React.useMemo(
    // eslint-disable-next-line sonarjs/cognitive-complexity
    () => ({
      siteName: appName,
      onAllConsentsGiven: () => {
        setShowCookieConsentModal(false);
      },
      currentLanguage: language as string as ContentSource['currentLanguage'],
      requiredCookies: {
        groups: [
          {
            commonGroup: 'essential',
            cookies: [
              {
                id: 'wordpress',
                name: 'wordpress_*, wp-settings-*',
                hostName: 'api.hel.fi',
                description: t('consent:cookies.wordpress') ?? '',
                expiration: t('consent:expiration.session') ?? '',
              },
              {
                id: 'linkedevents',
                name: 'linkedevents-api-prod-csrftoken',
                hostName: 'api.hel.fi',
                description: t('consent:cookies.linkedevents') ?? '',
                expiration: t('consent:expiration.year') ?? '',
              },
              {
                id: 'matomo',
                name: '_pk*',
                hostName: 'digia.fi',
                description: t('consent:cookies.matomo') ?? '',
                expiration: t('consent:expiration.days', { days: 393 }) ?? '',
              },
              {
                id: 'i18next',
                name: 'i18next',
                hostName: 'api.hel.fi',
                description: t('consent:cookies.i18next') ?? '',
                expiration: t('consent:expiration.session') ?? '',
              },
            ],
          },
        ],
      },
      optionalCookies: {
        groups: [
          {
            title: t('consent:groups.servicemap.title') ?? '',
            text: t('consent:groups.servicemap.text') ?? '',
            expandAriaLabel:
              t('consent:groups.servicemap.expandAriaLabel') ?? '',
            checkboxAriaDescription:
              t('consent:groups.servicemap.checkboxAriaDescription') ?? '',
            cookies: [
              {
                id: 'servicemap_analytics',
                name: '_pk.fi*',
                hostName: 'palvelukartta.hel.fi',
                description: t('consent:cookies.servicemap_analytics') ?? '',
                expiration: t('consent:expiration.days', { days: 393 }) ?? '',
              },
              {
                id: 'servicemap_session',
                name: 'ADRUM',
                hostName: 'palvelukartta.hel.fi',
                description: t('consent:cookies.servicemap_session') ?? '',
                expiration: t('consent:expiration.session') ?? '',
              },
              {
                id: 'servicemap_ga',
                name: '_ga*',
                hostName: 'palvelukartta.hel.fi',
                description: t('consent:cookies.servicemap_ga') ?? '',
                expiration: t('consent:expiration.session') ?? '',
              },
            ],
          },
        ],
      },
      language: {
        current: language,
        onLanguageChange,
      },
      focusTargetSelector: MAIN_CONTENT_ID,
    }),
    [t, language, appName, onLanguageChange]
  );

  if (!showCookieConsentModal) return null;

  return <CookieModal contentSource={contentSource} />;
};

export default EventsCookieConsent;
