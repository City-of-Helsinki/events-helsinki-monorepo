import { useCookies } from 'hds-react';
import { useCallback, useEffect, useState } from 'react';

import createAskemInstance from './instance';
import type { AskemConfigs, AskemInstance } from './types';

export default function useAskemContext({
  cookieDomain,
  asPath,
  askemConfigurationInput,
}: {
  cookieDomain: string;
  asPath: string;
  askemConfigurationInput: AskemConfigs;
}) {
  const { getAllConsents } = useCookies({ cookieDomain });
  const [askemInstance, setAskemInstance] = useState<AskemInstance | null>(
    null
  );
  const [consentGiven, setConsentGiven] = useState(false);

  const handleConsentGiven = useCallback(() => {
    const consents = getAllConsents();
    const hasConsent = !!(
      consents['askemBid'] &&
      consents['askemBidTs'] &&
      consents['askemReaction']
    );
    setConsentGiven(hasConsent);
  }, [getAllConsents]);

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
