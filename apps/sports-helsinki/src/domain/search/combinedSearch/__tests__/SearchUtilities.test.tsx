import { translations } from 'events-helsinki-common-i18n';
import { EventTypeId } from 'events-helsinki-components/types';
import * as React from 'react';
import { render, screen, userEvent } from '@/test-utils';
import SearchTabs from '../searchTabs/SearchTabs';
import type { SearchTabId, TabsContextType } from '../searchTabs/tabsContext';
import { TabsContext } from '../searchTabs/tabsContext';
import SearchUtilities from '../SearchUtilities';

type SearchType =
  | keyof typeof translations.search.search.searchType
  | SearchTabId;

const getTabsContextValue = ({
  activeTab,
  resultCounts,
}: Partial<Omit<TabsContextType, 'resultCounts'>> & {
  resultCounts?: Partial<TabsContextType['resultCounts']>;
}): TabsContextType => ({
  activeTab: activeTab ?? 'Venue',
  resultCounts: {
    Venue: 777,
    [EventTypeId.General]: 888,
    [EventTypeId.Course]: 999,
    ...resultCounts,
  },
  setActiveTab: jest.fn(),
  setResultCount: jest.fn(),
});

describe('SearchTabs search utilities', () => {
  const renderSearchTabs = () =>
    render(
      <SearchTabs initTab="Venue">
        <SearchUtilities />
      </SearchTabs>
    );

  it.each<SearchType>(['Venue', EventTypeId.Course, EventTypeId.General])(
    'should render %s tab inside the search tabs when the tabs context is empty',
    async (tabId) => {
      const tabLabel: string = translations.search.search.searchType[tabId];
      renderSearchTabs();
      expect(
        screen.getByRole('button', {
          name: `${tabLabel}: ...`,
        })
      ).toBeInTheDocument();
    }
  );

  it.each<SearchType>(['Venue', EventTypeId.Course, EventTypeId.General])(
    'should show the search result count as part of the %s tab label',
    async (tabId) => {
      const tabLabel: string = translations.search.search.searchType[tabId];
      const expectedCount = 100;
      const context = getTabsContextValue({
        activeTab: tabId,
        resultCounts: { [tabId]: expectedCount },
      });
      render(
        <TabsContext.Provider value={context}>
          <SearchUtilities />
        </TabsContext.Provider>
      );
      expect(
        screen.getByRole('button', {
          name: `${tabLabel}: ${expectedCount}`,
        })
      ).toBeInTheDocument();
    }
  );

  it.each<SearchType>(['Venue', EventTypeId.Course, EventTypeId.General])(
    'clicking the %s tab should set the active tab id',
    async (tabId) => {
      const tabLabel: string = translations.search.search.searchType[tabId];
      const context = getTabsContextValue({
        activeTab: 'Venue',
      });
      const { router } = render(
        <TabsContext.Provider value={context}>
          <SearchUtilities />
        </TabsContext.Provider>
      );
      await userEvent.click(
        screen.getByRole('button', {
          name: new RegExp(tabLabel, 'i'),
        })
      );
      expect(context.setActiveTab).toHaveBeenCalledWith(tabId);
      expect(router).toMatchObject({
        query: { searchType: tabId },
      });
    }
  );
});
