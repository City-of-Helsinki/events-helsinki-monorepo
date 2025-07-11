import useMatomo from '@jonkoops/matomo-tracker-react/lib/useMatomo.js';
import { useCookies } from 'hds-react';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import React, { useEffect } from 'react';
import { useCookieConfigurationContext } from '../../cookieConfigurationProvider';

interface Props {
  children?: ReactNode | undefined;
}

const MatomoWrapper: React.FC<Props> = ({ children }) => {
  const { trackPageView, pushInstruction } = useMatomo();
  const { asPath: pathname } = useRouter();
  const { cookieDomain } = useCookieConfigurationContext();
  const { getAllConsents } = useCookies({ cookieDomain });

  // Track page changes when pathnname changes
  useEffect(() => {
    const getConsentStatus = (cookieId: string) => {
      const consents = getAllConsents();
      return consents[cookieId];
    };

    if (getConsentStatus('matomo')) {
      pushInstruction('setCookieConsentGiven');
    } else {
      pushInstruction('forgetCookieConsentGiven');
    }

    // track in cookieless mode
    trackPageView({
      href: window.location.href,
    });
  }, [getAllConsents, pathname, pushInstruction, trackPageView]);

  return <>{children}</>;
};

export default MatomoWrapper;
