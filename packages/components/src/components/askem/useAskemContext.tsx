// import { useCookieConfigurationContext } from 'cookieConfigurationProvider';
import { useCookieConsents } from 'hds-react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import useCookieConfigurationContext from '../../cookieConfigurationProvider/useCookieConfigurationContext';
import createAskemInstance from './instance';
import type { AskemInstance } from './types';

export default function useAskemContext() {
  const { asPath } = useRouter();
  // TODO: handle cookieDomain?
  const { cookieDomain, askemConfiguration: askemConfigurationInput } =
    useCookieConfigurationContext();

  const consents = useCookieConsents();
  const [askemInstance, setAskemInstance] = useState<AskemInstance | null>(
    null
  );
  const [consentGiven, setConsentGiven] = useState(false);

  const handleConsentGiven = useCallback(() => {
    const hasConsent = !!['askemBid', 'askemBidTs', 'askemReaction'].every(
      (groupName) =>
        Boolean(
          consents.find((consent) => consent.group === groupName)?.consented
        )
    );
    setConsentGiven(hasConsent);
  }, [consents]);

  useEffect(() => {
    if (asPath) {
      handleConsentGiven();
    }
  }, [asPath, handleConsentGiven]);

  useEffect(() => {
    setAskemInstance(
      createAskemInstance({ ...askemConfigurationInput, consentGiven })
    );
  }, [askemConfigurationInput, consentGiven]);

  return { askemInstance, handleConsentGiven };
}
