import useMatomo from '@jonkoops/matomo-tracker-react/lib/useMatomo.js';
import {
  CookieConsentContextProvider,
  CookieSettingsPage,
  CookieBanner,
  CookieConsentContextProps,
} from 'hds-react';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { MAIN_CONTENT_ID } from '../../constants';
import { useCookieConfigurationContext } from '../../cookieConfigurationProvider';
import { useConsentTranslation } from '../../hooks';
import useLocale from '../../hooks/useLocale';
import useConsentSiteSettings from './useConsentSiteSettings';

type CookieContextLanguage = NonNullable<
  CookieConsentContextProps['options']
>['language'];

type Props = {
  appName: string;
  onConsentGiven?: () => void;
  allowLanguageSwitch?: boolean;
  isModal?: boolean;
};

const EventsCookieConsent: React.FC<Props> = ({
  onConsentGiven,
  allowLanguageSwitch = true,
  isModal = true,
}) => {
  const locale = useLocale();
  const { asPath: pathname } = useRouter();
  const { t, i18n } = useConsentTranslation();
  const [language, setLanguage] = React.useState<CookieContextLanguage>(locale);
  const { cookieDomain } = useCookieConfigurationContext();
  const { getAllConsents } = useCookies({ cookieDomain });
  const { pushInstruction } = useMatomo();
  const [showCookieConsentModal, setShowCookieConsentModal] = React.useState(
    !Object.keys(getAllConsents()).length
  );

  useEffect(() => {
    handleMatomoUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const onLanguageChange = React.useCallback(
    (newLang: string) => {
      if (allowLanguageSwitch) {
        setLanguage(newLang);
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
      setShowCookieConsentModal(true);
    }
  }, [getAllConsents, pushInstruction]);

  const siteSettings = useConsentSiteSettings();

  const onChange = () => {
    console.log('TODO: implement onChange handler to cookie consent');
  };

  const onAllConsentsGiven = () => {
    setShowCookieConsentModal(false);
    if (onConsentGiven) {
      handleMatomoUpdate();
      onConsentGiven();
    }
  };
  return (
    <CookieConsentContextProvider
      onChange={onChange}
      // focusing the logo link, because the tab component loses focus on re-render.
      options={{ language, focusTargetSelector: '#actionbar > a' }}
      siteSettings={siteSettings}
    >
      {isModal && showCookieConsentModal && <CookieBanner />}
      {!isModal && <CookieSettingsPage />}
    </CookieConsentContextProvider>
  );
};

export default EventsCookieConsent;
