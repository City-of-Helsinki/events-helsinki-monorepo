import type { EventTypeId } from 'events-helsinki-components';
import React from 'react';
export type SearchTabId = 'Venue' | keyof typeof EventTypeId;
export type TabsPropType = {
  children: React.ReactNode;
};
export type TabsContextType = {
  activeTab: SearchTabId;
  setActiveTab: (id: SearchTabId) => void;
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
