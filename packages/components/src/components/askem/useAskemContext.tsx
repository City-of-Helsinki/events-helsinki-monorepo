// import { useCookieConfigurationContext } from 'cookieConfigurationProvider';
import { useCookieConsents } from 'hds-react';
import { useCallback, useEffect, useState } from 'react';

import createAskemInstance from './instance';
import type { AskemConfigs, AskemInstance } from './types';

export default function useAskemContext({
  asPath,
  askemConfigurationInput,
}: {
  asPath: string;
  askemConfigurationInput: AskemConfigs;
}) {
  // TODO: handle cookieDomain?
  // const { cookieDomain } = useCookieConfigurationContext();
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
