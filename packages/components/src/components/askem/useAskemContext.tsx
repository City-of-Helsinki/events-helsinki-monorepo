import { useCookies } from 'hds-react';
import isEqual from 'lodash/isEqual';
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
  const [askemConsentGiven, setAskemConsentGiven] = useState<boolean>(false);
  const [askemInstance, setAskemInstance] = useState<AskemInstance | null>(
    null
  );
  const [askemConfiguration, setAskemConfiguration] =
    useState<AskemConfigs | null>(null);

  const handleConsentGiven = useCallback(() => {
    const consents = getAllConsents();
    setAskemConsentGiven(
      consents['askemBid'] &&
        consents['askemBidTs'] &&
        consents['askemReaction']
    );
  }, [getAllConsents]);

  useEffect(() => {
    if (asPath) {
      handleConsentGiven();
    }
  }, [handleConsentGiven, asPath]);

  const newAskemConfiguration: AskemConfigs = {
    ...askemConfigurationInput,
    consentGiven: askemConsentGiven,
  };

  if (!askemInstance || !isEqual(askemConfiguration, newAskemConfiguration)) {
    setAskemConfiguration(newAskemConfiguration);
    setAskemInstance(createAskemInstance(newAskemConfiguration));
  }

  return { askemInstance, handleConsentGiven };
}
