import React from 'react';
import type { createAskemInstance } from '../components/askem';

export type CookieConfigurationContextProps = {
  cookieDomain: string;
  askemConfiguration: Parameters<typeof createAskemInstance>[0];
};

const defaultCookieDomain = '';
const defaultAskemConfiguration = {};

const CookieConfigurationContext =
  React.createContext<CookieConfigurationContextProps>({
    cookieDomain: defaultCookieDomain,
    askemConfiguration: defaultAskemConfiguration,
  });

export default CookieConfigurationContext;
