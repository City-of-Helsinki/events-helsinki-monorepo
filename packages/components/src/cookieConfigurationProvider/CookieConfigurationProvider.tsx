import React from 'react';
import type { CookieConfigurationContextProps } from './CookieConfigurationContext';
import CookieConfigurationContext from './CookieConfigurationContext';

export type CookieConfigurationProviderProps =
  CookieConfigurationContextProps & {
    children: React.ReactNode;
  };

export default function CookieConfigurationProvider({
  askemConfiguration,
  cookieDomain,
  appName,
  consentUrl,
  children,
}: CookieConfigurationProviderProps) {
  const context = { askemConfiguration, cookieDomain, appName, consentUrl };
  return (
    <CookieConfigurationContext.Provider value={context}>
      {children}
    </CookieConfigurationContext.Provider>
  );
}
