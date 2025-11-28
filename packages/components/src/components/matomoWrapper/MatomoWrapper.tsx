import useMatomo from '@jonkoops/matomo-tracker-react/lib/useMatomo.js';
import { useGroupConsent } from 'hds-react';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import React, { useEffect } from 'react';
import { userTrackingLogger } from '../../loggers/logger';
import { consentGroupIds } from '../eventsCookieConsent/constants';

interface Props {
  children?: ReactNode | undefined;
}

const MatomoWrapper: React.FC<Props> = ({ children }) => {
  const { trackPageView, pushInstruction } = useMatomo();
  const { asPath: pathname } = useRouter();
  const isConsentGiven = useGroupConsent(consentGroupIds.matomo);

  // Initial Setup: Always require consent first.
  useEffect(() => {
    userTrackingLogger.info(
      // eslint-disable-next-line @stylistic/max-len
      "Matomo Initialization: Pushing 'requireCookieConsent'. Tracking is now paused until consent is explicitly granted."
    );
    pushInstruction('requireCookieConsent');
  }, [pushInstruction]);

  // Consent and Page View management: Track page changes when pathname changes
  useEffect(() => {
    if (isConsentGiven) {
      // Consent granted or already active
      userTrackingLogger.info(
        // eslint-disable-next-line @stylistic/max-len
        `Consent **GRANTED** (Matomo). Pushing 'setCookieConsentGiven' **AND 'rememberCookieConsentGiven'** instruction. Tracking page view for path: ${pathname}`
      );

      // Give consent
      pushInstruction('setCookieConsentGiven');

      // Remember this choice persistently for future visits
      pushInstruction('rememberCookieConsentGiven');

      // Track the page view (only if consent is given)
      trackPageView({
        href: window.location.href,
      });
    } else {
      // Consent removed or not yet given
      userTrackingLogger.info(
        // eslint-disable-next-line @stylistic/max-len
        `Consent **REVOKED/NOT GIVEN** (Matomo). Pushing 'forgetCookieConsentGiven' instruction. Tracking is now paused/forgotten.`
      );
      // Remove consent
      pushInstruction('forgetCookieConsentGiven');
    }
  }, [isConsentGiven, pathname, pushInstruction, trackPageView]);

  return <>{children}</>;
};

export default MatomoWrapper;
