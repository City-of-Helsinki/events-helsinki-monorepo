import { createInstance as createMatomoInstance } from '@jonkoops/matomo-tracker-react';
import { useMemo } from 'react';

export default function useMatomoInstance(
  matomoConfiguration: Parameters<typeof createMatomoInstance>[0]
) {
  return useMemo(
    () => createMatomoInstance(matomoConfiguration),
    [matomoConfiguration]
  );
}
