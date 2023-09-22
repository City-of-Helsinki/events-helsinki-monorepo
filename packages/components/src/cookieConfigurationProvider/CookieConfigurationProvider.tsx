import React from 'react';
import type { CookieConfigurationContextProps } from './CookieConfigurationContext';
import CookieConfigurationContext from './CookieConfigurationContext';

export type CookieConfigurationProviderProps =
  CookieConfigurationContextProps & {
    children: React.ReactNode;
  };

export default function CookieConfigurationProvider({
  cookieDomain,
  children,
}: CookieConfigurationProviderProps) {
  const context = { cookieDomain };
  return (
    <CookieConfigurationContext.Provider value={context}>
      {children}
    </CookieConfigurationContext.Provider>
  );
}
