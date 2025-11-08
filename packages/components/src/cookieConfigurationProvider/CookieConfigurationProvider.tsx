import React from 'react';
import type { CookieConfigurationContextProps } from './CookieConfigurationContext';
import CookieConfigurationContext from './CookieConfigurationContext';

export type CookieConfigurationProviderProps =
  CookieConfigurationContextProps & {
    children: React.ReactNode;
  };

export default function CookieConfigurationProvider({
  children,
  ...contextValue
}: CookieConfigurationProviderProps) {
  return (
    <CookieConfigurationContext.Provider value={contextValue}>
      {children}
    </CookieConfigurationContext.Provider>
  );
}
