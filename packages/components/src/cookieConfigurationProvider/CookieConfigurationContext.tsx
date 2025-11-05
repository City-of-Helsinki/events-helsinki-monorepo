import type createMatomoInstance from '@jonkoops/matomo-tracker-react/lib/instance.js';
import React from 'react';
import type { createAskemInstance } from '../components/askem';

export type CookieConfigurationContextProps = {
  cookieDomain: string;
  askemConfiguration: Parameters<typeof createAskemInstance>[0];
  matomoConfiguration: Parameters<typeof createMatomoInstance>[0];
  appName: string;
  consentUrl: string;
};

const CookieConfigurationContext =
  React.createContext<CookieConfigurationContextProps>({
    cookieDomain: '',
    askemConfiguration: {},
    matomoConfiguration: {
      urlBase: '',
      siteId: 0,
    },
    appName: '',
    consentUrl: '/cookie-consent',
  });

export default CookieConfigurationContext;
