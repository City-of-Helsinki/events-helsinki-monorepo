import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import type { Config } from 'events-helsinki-components';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';

import eventsDefaultConfig from '../common-events/configProvider/defaultConfig';

export default function useEventsConfig(
  eventsApolloClient: ApolloClient<NormalizedCacheObject>
): Config {
  const router = useRouter();
  const { t } = useTranslation('common');

  return React.useMemo(() => {
    return {
      ...eventsDefaultConfig,
      t: t,
      apolloClient: eventsApolloClient,
      router,
    } as unknown as Config;
  }, [router, eventsApolloClient, t]);
}
