import { useCookieConsents } from 'hds-react';
import { useCallback, useEffect, useState } from 'react';

import createAskemInstance from './instance';
import type { AskemConfigs, AskemInstance } from './types';

export default function useAskemContext({
  // TODO: handle cookieDomain
  cookieDomain,
  asPath,
  askemConfigurationInput,
}: {
  cookieDomain: string;
  asPath: string;
  askemConfigurationInput: AskemConfigs;
}) {
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
