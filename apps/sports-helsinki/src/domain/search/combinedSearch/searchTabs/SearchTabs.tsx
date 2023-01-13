import classnames from 'classnames';
import { EventTypeId } from 'events-helsinki-components';
import { Button } from 'hds-react';
import { useRouter } from 'next/router';
import React from 'react';
import { PARAM_SEARCH_TYPE } from '../constants';
import styles from './searchTabs.module.scss';
import type {
  SearchResultCounts,
  SearchTabId,
  TabsContextType,
} from './tabsContext';
import { TabsContext, useTabsContext } from './tabsContext';

export type TabsPropType = {
  id: TabsContextType['activeTab'];
  children: React.ReactNode;
};

export function SearchTab({ id, children }: TabsPropType) {
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

const SearchTabList = ({
  children,
}: {
  children: React.ReactComponentElement<typeof SearchTab>[];
}) => {
  return <div className={styles.tabs}>{children}</div>;
};

type SearchTabContentProps = {
  id: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const SearchTabPanelContent = ({ id, children }: SearchTabContentProps) => {
  const { activeTab } = useTabsContext();
  return activeTab === id ? (
    <div className={styles.panelContent}>{children}</div>
  ) : null;
};

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
SearchTabs.Panel = SearchTabPanelContent;
SearchTabs.CountLabel = SearchTabLabel;
export default SearchTabs;
