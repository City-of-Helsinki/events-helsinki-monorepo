import type { Option } from '@events-helsinki/components';
import { EventTypeId, Select } from '@events-helsinki/components';
import classnames from 'classnames';
import type { SelectCustomTheme } from 'hds-react';
import { Button } from 'hds-react';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { PARAM_SEARCH_TYPE } from '../constants';
import styles from './searchTabs.module.scss';
import type {
  SearchResultCounts,
  SearchTabId,
  TabsContextType,
} from './tabsContext';
import { TabsContext, useTabsContext } from './tabsContext';

export type TabDataType = {
  id: SearchTabId;
  label: string;
};

type TabsPropType = {
  id: TabsContextType['activeTab'];
  children: React.ReactNode;
};

function SearchTab({ id, children }: TabsPropType) {
  const router = useRouter();
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === id;
  const onClick = () => {
    setActiveTab(id);
    router.push(
      { query: { ...router.query, [PARAM_SEARCH_TYPE]: id } },
      undefined,
      {
        shallow: true,
      }
    );
  };
  return (
    <Button
      variant="secondary"
      className={classnames(styles.tab, styles.secondaryButton, {
        [styles.active]: isActive,
      })}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function SearchTabList({
  children,
}: {
  children: React.ReactComponentElement<typeof SearchTab>[];
}) {
  return <div className={styles.tabs}>{children}</div>;
}

type SearchTabListMobileProps = {
  data: TabDataType[];
};

function SearchTabListMobile({ data }: SearchTabListMobileProps) {
  const router = useRouter();
  const { resultCounts, activeTab, setActiveTab } = useTabsContext();

  const options = useMemo(
    (): Option[] =>
      data.map((option: TabDataType) => {
        return {
          text: `${option.label}: ${resultCounts[option.id] ?? '...'}`,
          value: option.id,
        };
      }),
    [data, resultCounts]
  );
  const handleSearchTabChange = (option: Option) => {
    setActiveTab(option.value as SearchTabId);
    router.push(
      { query: { ...router.query, [PARAM_SEARCH_TYPE]: option.value } },
      undefined,
      {
        shallow: true,
      }
    );
  };

  return (
    <div className={styles.tabsMobile}>
      <Select
        theme={
          {
            '--menu-item-background': 'var(--color-input-dark)',
            '--menu-item-background-hover': 'var(--color-input-dark)',
            '--menu-item-background-selected-hover': 'var(--color-input-dark)',
          } as SelectCustomTheme
        }
        label="venues-search-tabs-mobile"
        value={options.filter((o) => o.value == activeTab)[0] || options[0]}
        onChange={handleSearchTabChange}
        options={options}
      />
    </div>
  );
}

type SearchTabContentProps = {
  id: string;
  children: React.ReactNode;
  onClick?: () => void;
};

function SearchTabPanelContent({ id, children }: SearchTabContentProps) {
  const { activeTab } = useTabsContext();
  return activeTab === id ? (
    <div className={styles.panelContent}>{children}</div>
  ) : null;
}

type SearchTabsProps = {
  initTab: SearchTabId;
  children: React.ReactNode;
};

function SearchTabs({ initTab, children }: SearchTabsProps) {
  const [activeTab, setActiveTab] = React.useState<SearchTabId>(initTab);
  const [resultCounts, setResultCounts] = React.useState<SearchResultCounts>({
    Venue: null,
    [EventTypeId.General]: null,
    [EventTypeId.Course]: null,
  });
  const setResultCount = (id: SearchTabId, count: number | null) =>
    setResultCounts((prevState) => ({ ...prevState, [id]: count }));

  // Set the initTab as an active tab if it changes
  React.useEffect(() => {
    setActiveTab(initTab);
  }, [initTab]);

  return (
    <TabsContext.Provider
      value={{ activeTab, setActiveTab, resultCounts, setResultCount }}
    >
      {children}
    </TabsContext.Provider>
  );
}

type SearchTabLabelProps = {
  id?: TabsContextType['activeTab'];
  label: string;
};

function SearchTabLabel({ id, label }: SearchTabLabelProps) {
  const { resultCounts } = useTabsContext();
  const storedCount = id ? resultCounts[id] : null;
  // Todo: Use a small loading spinner instead of ellipsis.
  const count = storedCount !== null ? storedCount : '...';

  return (
    <span>
      {label}
      {count !== null ? `: ${count}` : ''}
    </span>
  );
}

SearchTabs.Tab = SearchTab;
SearchTabs.TabList = SearchTabList;
SearchTabs.SearchTabListMobile = SearchTabListMobile;
SearchTabs.Panel = SearchTabPanelContent;
SearchTabs.CountLabel = SearchTabLabel;
export default SearchTabs;
