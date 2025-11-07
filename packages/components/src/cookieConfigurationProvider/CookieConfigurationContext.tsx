import React from 'react';
import type { createAskemInstance } from '../components/askem';

export type CookieConfigurationContextProps = {
  cookieDomain: string;
  askemConfiguration: Parameters<typeof createAskemInstance>[0];
  appName: string;
};

const CookieConfigurationContext =
  React.createContext<CookieConfigurationContextProps>({
    cookieDomain: '',
    askemConfiguration: {},
    appName: '',
  });

export default CookieConfigurationContext;
