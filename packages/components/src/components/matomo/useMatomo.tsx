import createMatomoInstance from '@jonkoops/matomo-tracker-react/lib/instance.js';
import { useMemo } from 'react';

export default function useMatomoInstance(
  matomoConfiguration: Parameters<typeof createMatomoInstance>[0]
) {
  return useMemo(
    () => createMatomoInstance(matomoConfiguration),
    [matomoConfiguration]
  );
}
