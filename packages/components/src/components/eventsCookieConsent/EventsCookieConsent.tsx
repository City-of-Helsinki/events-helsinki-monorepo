import { useMatomo } from '@jonkoops/matomo-tracker-react';
import type { ContentSource } from 'hds-react';
import { CookiePage, useCookies, CookieModal } from 'hds-react';
import React, { useCallback } from 'react';
import { MAIN_CONTENT_ID } from '../../constants';
import { useCookieConfigurationContext } from '../../cookieConfigurationProvider';
import { useConsentTranslation } from '../../hooks';
import useLocale from '../../hooks/useLocale';

type Props = {
  appName: string;
  onConsentGiven?: () => void;
  allowLanguageSwitch?: boolean;
  isModal?: boolean;
};

const EventsCookieConsent: React.FC<Props> = ({
  appName,
  onConsentGiven,
  allowLanguageSwitch = true,
  isModal = true,
}) => {
  const locale = useLocale();
  const { t, i18n } = useConsentTranslation();
  const [language, setLanguage] =
    React.useState<ContentSource['currentLanguage']>(locale);
  const { cookieDomain } = useCookieConfigurationContext();
  const { getAllConsents } = useCookies({ cookieDomain });
  const { pushInstruction } = useMatomo();
  const [showCookieConsentModal, setShowCookieConsentModal] = React.useState(
    !Object.keys(getAllConsents()).length
  );

  const onLanguageChange = React.useCallback(
    (newLang: string) => {
      if (allowLanguageSwitch) {
        setLanguage(newLang as ContentSource['currentLanguage']);
        i18n.changeLanguage(newLang);
      }
    },
    [i18n, setLanguage, allowLanguageSwitch]
  );

  const handleMatomoUpdate = useCallback(() => {
    const getConsentStatus = (cookieId: string) => {
      const consents = getAllConsents();
      return consents[cookieId];
    };
    if (getConsentStatus('matomo')) {
      pushInstruction('setCookieConsentGiven');
    } else {
      pushInstruction('forgetCookieConsentGiven');
    }
  }, [getAllConsents, pushInstruction]);

  const contentSource: ContentSource = React.useMemo(
    () => ({
      siteName: appName,
      onAllConsentsGiven: () => {
        setShowCookieConsentModal(false);
        if (onConsentGiven) {
          handleMatomoUpdate();
          onConsentGiven();
        }
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
                description: t('consent:cookies.wordpress'),
                expiration: t('consent:expiration.session'),
              },
              {
                id: 'linkedevents',
                name: 'linkedevents-api-prod-csrftoken',
                hostName: 'api.hel.fi',
                description: t('consent:cookies.linkedevents'),
                expiration: t('consent:expiration.year'),
              },
              {
                id: 'i18next',
                name: 'i18next',
                hostName: 'api.hel.fi',
                description: t('consent:cookies.i18next'),
                expiration: t('consent:expiration.session'),
              },
            ],
          },
        ],
      },
      optionalCookies: {
        groups: [
          {
            title: t('consent:groups.optionalServiceMap.title'),
            text: t('consent:groups.optionalServiceMap.text'),
            expandAriaLabel: t(
              'consent:groups.optionalServiceMap.expandAriaLabel'
            ),
            checkboxAriaDescription: t(
              'consent:groups.optionalServiceMap.checkboxAriaDescription'
            ),
            cookies: [
              {
                id: 'servicemap_analytics',
                name: '_pk.fi*',
                hostName: 'palvelukartta.hel.fi',
                description: t('consent:cookies.servicemap_analytics'),
                expiration: t('consent:expiration.days', { days: 393 }),
              },
              {
                id: 'servicemap_session',
                name: 'ADRUM',
                hostName: 'palvelukartta.hel.fi',
                description: t('consent:cookies.servicemap_session'),
                expiration: t('consent:expiration.session'),
              },
              {
                id: 'servicemap_ga',
                name: '_ga*',
                hostName: 'palvelukartta.hel.fi',
                description: t('consent:cookies.servicemap_ga'),
                expiration: t('consent:expiration.session'),
              },
            ],
          },
          {
            title: t('consent:groups.optionalMatomo.title'),
            text: t('consent:groups.optionalMatomo.text'),
            expandAriaLabel: t('consent:groups.optionalMatomo.expandAriaLabel'),
            checkboxAriaDescription: t(
              'consent:groups.optionalMatomo.checkboxAriaDescription'
            ),
            cookies: [
              {
                id: 'matomo',
                name: '_pk*',
                hostName: 'digia.fi',
                description: t('consent:cookies.matomo'),
                expiration: t('consent:expiration.days', { days: 393 }),
              },
            ],
          },
          {
            title: t('consent:groups.optionalAskem.title'),
            text: t('consent:groups.optionalAskem.text'),
            expandAriaLabel: t('consent:groups.optionalAskem.expandAriaLabel'),
            checkboxAriaDescription: t(
              'consent:groups.optionalAskem.checkboxAriaDescription'
            ),
            cookies: [
              {
                id: 'askemBid',
                name: 'rnsbid',
                hostName: 'reactandshare.com',
                description: t('consent:cookies.askem'),
                expiration: '-',
              },
              {
                id: 'askemBidTs',
                name: 'rnsbid_ts',
                hostName: 'reactandshare.com',
                description: t('consent:cookies.askem'),
                expiration: '-',
              },
              {
                id: 'askemReaction',
                name: 'rns_reaction_*',
                hostName: 'reactandshare.com',
                description: t('consent:cookies.askem'),
                expiration: '-',
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
    [appName, language, t, onLanguageChange, onConsentGiven, handleMatomoUpdate]
  );

  return (
    <>
      {isModal && showCookieConsentModal && (
        <CookieModal
          contentSource={contentSource}
          cookieDomain={cookieDomain}
        />
      )}
      {!isModal && (
        <CookiePage contentSource={contentSource} cookieDomain={cookieDomain} />
      )}
    </>
  );
};

export default EventsCookieConsent;
