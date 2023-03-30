import { EventTypeId } from '@events-helsinki/components';
import React from 'react';
export type SearchTabId = 'Venue' | keyof typeof EventTypeId;
export type SearchResultCounts = {
  [K in SearchTabId]: number | null;
};
export function isSearchTabId(
  tabId: SearchTabId | string | null
): tabId is SearchTabId {
  return (
    tabId !== null && [...Object.values(EventTypeId), 'Venue'].includes(tabId)
  );
}
export type TabsPropType = {
  children: React.ReactNode;
};
export type TabsContextType = {
  activeTab: SearchTabId;
  setActiveTab: (id: SearchTabId) => void;
  resultCounts: SearchResultCounts;
  setResultCount: (id: SearchTabId, count: number | null) => void;
};
export const TabsContext = React.createContext<TabsContextType | undefined>(
  undefined
);
export function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error(
      `Tabs components cannot be rendered outside the TabsProvider`
    );
  }
  return context;
}
