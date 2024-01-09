import { useMatomo } from '@jonkoops/matomo-tracker-react';
import { useCookies } from 'hds-react';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import { useCookieConfigurationContext } from '../../cookieConfigurationProvider';

interface Props {
  children?: ReactNode | undefined;
}

const MatomoWrapper: React.FC<Props> = ({ children }) => {
  const { trackPageView, pushInstruction } = useMatomo();
  const { asPath: pathname } = useRouter();
  const { cookieDomain } = useCookieConfigurationContext();
  const { getAllConsents } = useCookies({ cookieDomain });
  const [isRequiredOnLoad, setIsRequiredOnLoad] = useState(true);

  // Track page changes when pathnname changes
  useEffect(() => {
    if (!isRequiredOnLoad) {
      const getConsentStatus = (cookieId: string) => {
        const consents = getAllConsents();
        return consents[cookieId];
      };

      // if enabled, should be called before each trackPage instruction
      if (getConsentStatus('matomo')) {
        pushInstruction('rememberCookieConsentGiven');
        pushInstruction('rememberConsentGiven');
      } else {
        pushInstruction('forgetCookieConsentGiven');
        pushInstruction('forgetConsentGiven');
      }

      trackPageView({
        href: window.location.href,
      });
    }
  }, [
    getAllConsents,
    pathname,
    pushInstruction,
    trackPageView,
    isRequiredOnLoad,
  ]);

  // Track page changes when pathnname changes
  useEffect(() => {
    // set required on load always
    if (isRequiredOnLoad) {
      pushInstruction('requireCookieConsent');
      pushInstruction('requireConsent');
      setIsRequiredOnLoad(false);
    }
  }, [isRequiredOnLoad, pushInstruction, setIsRequiredOnLoad]);

  return <>{children}</>;
};

export default MatomoWrapper;
