import { useGroupConsent } from 'hds-react';
import { useEffect, useState } from 'react';

import useCookieConfigurationContext from '../../cookieConfigurationProvider/useCookieConfigurationContext';
import { consentGroupIds } from '../eventsCookieConsent/constants';
import createAskemInstance from './instance';
import type { AskemInstance } from './types';

export default function useAskemContext() {
  const { askemConfiguration } = useCookieConfigurationContext();
  const isConsentGiven = useGroupConsent(consentGroupIds.askem);
  const [askemInstance, setAskemInstance] = useState<AskemInstance | null>(
    null
  );

  useEffect(() => {
    setAskemInstance(
      createAskemInstance({
        ...askemConfiguration,
        consentGiven: isConsentGiven,
      })
    );
  }, [askemConfiguration, isConsentGiven]);

  return { askemInstance };
}
