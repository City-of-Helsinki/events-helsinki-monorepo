import useMatomo from '@jonkoops/matomo-tracker-react/lib/useMatomo.js';
import { useGroupConsent } from 'hds-react';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import React, { useEffect } from 'react';
import { consentGroupIds } from '../eventsCookieConsent/constants';

interface Props {
  children?: ReactNode | undefined;
}

const MatomoWrapper: React.FC<Props> = ({ children }) => {
  const { trackPageView, pushInstruction } = useMatomo();
  const { asPath: pathname } = useRouter();
  const isConsentGiven = useGroupConsent(consentGroupIds.matomo);

  // Track page changes when pathnname changes
  useEffect(() => {
    if (isConsentGiven) {
      pushInstruction('setCookieConsentGiven');
    } else {
      pushInstruction('forgetCookieConsentGiven');
    }

    // track in cookieless mode
    trackPageView({
      href: window.location.href,
    });
  }, [isConsentGiven, pathname, pushInstruction, trackPageView]);

  return <>{children}</>;
};

export default MatomoWrapper;
