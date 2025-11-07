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
  children,
}: CookieConfigurationProviderProps) {
  const context = { askemConfiguration, cookieDomain, appName };
  return (
    <CookieConfigurationContext.Provider value={context}>
      {children}
    </CookieConfigurationContext.Provider>
  );
}
