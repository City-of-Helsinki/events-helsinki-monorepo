import type { Config } from 'events-helsinki-components';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { useApolloClient } from 'domain/clients/eventsFederationApolloClient';

import eventsDefaultConfig from '../common-events/configProvider/defaultConfig';

export default function useEventsConfig(): Config {
  const apolloClient = useApolloClient();
  const router = useRouter();
  const { t } = useTranslation('common');

  return React.useMemo(() => {
    return {
      ...eventsDefaultConfig,
      t: t,
      apolloClient,
      router,
    } as unknown as Config;
  }, [router, apolloClient, t]);
}
