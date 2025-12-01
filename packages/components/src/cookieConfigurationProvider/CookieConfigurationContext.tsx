import type createMatomoInstance from '@jonkoops/matomo-tracker-react/lib/instance.js';
import React from 'react';
import type { createAskemInstance } from '../components/askem';

export type CookieConfigurationContextProps = {
  cookieDomain: string;
  askemConfiguration: Parameters<typeof createAskemInstance>[0];
  matomoConfiguration: Parameters<typeof createMatomoInstance>[0];
  /**
   * AppName is a real local specific name for the app.
   */
  appName: string;
  /**
   * global app name must be a unique name for the app, that does not change when e.g. a locale is changed.
   */
  globalAppName: string;
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
    globalAppName: 'events-helsinki',
    consentUrl: '/cookie-consent',
  });

export default CookieConfigurationContext;
