import React from 'react';
import type { AppRoutingContextProps } from './AppRoutingContext';
import AppRoutingContext from './AppRoutingContext';

export type AppRoutingProviderProps = AppRoutingContextProps & {
  children: React.ReactNode;
};

export default function NavigationProvider({
  getCardUrl,
  getEventUrl,
  getEventListLinkUrl,
  getOrganizationSearchUrl,
  getHelsinkiOnlySearchUrl,
  getPlainEventUrl,
  getKeywordOnClickHandler,
  children,
}: AppRoutingProviderProps) {
  const context = {
    getCardUrl,
    getEventUrl,
    getEventListLinkUrl,
    getOrganizationSearchUrl,
    getHelsinkiOnlySearchUrl,
    getPlainEventUrl,
    getKeywordOnClickHandler,
  };
  return (
    <AppRoutingContext.Provider value={context}>
      {children}
    </AppRoutingContext.Provider>
  );
}
