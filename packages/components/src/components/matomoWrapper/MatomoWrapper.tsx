import { useMatomo } from '@jonkoops/matomo-tracker-react';
import { useCookies } from 'hds-react';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import React, { useEffect } from 'react';

interface Props {
  children?: ReactNode | undefined;
}

const MatomoWrapper: React.FC<Props> = ({ children }) => {
  const { trackPageView, pushInstruction } = useMatomo();
  const { asPath: pathname } = useRouter();
  const { getAllConsents } = useCookies();

  // Track page changes when pathnname changes
  useEffect(() => {
    const getConsentStatus = (cookieId: string) => {
      const consents = getAllConsents();
      return consents[cookieId];
    };

    // if enabled, should be callled before each trackPage instruction
    if (getConsentStatus('matomo')) {
      pushInstruction('requireCookieConsent');
    } else {
      pushInstruction('setCookieConsentGiven');
    }

    trackPageView({
      href: window.location.href,
    });
  }, [getAllConsents, pathname, pushInstruction, trackPageView]);

  return <>{children}</>;
};

export default MatomoWrapper;
