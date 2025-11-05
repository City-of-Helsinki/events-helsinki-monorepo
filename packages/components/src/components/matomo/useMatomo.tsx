import createMatomoInstance from '@jonkoops/matomo-tracker-react/lib/instance.js';
import { useMemo } from 'react';
import { useCookieConfigurationContext } from '../../cookieConfigurationProvider';

export default function useMatomoInstance() {
  const { matomoConfiguration } = useCookieConfigurationContext();
  return useMemo(
    () => createMatomoInstance(matomoConfiguration),
    [matomoConfiguration]
  );
}
