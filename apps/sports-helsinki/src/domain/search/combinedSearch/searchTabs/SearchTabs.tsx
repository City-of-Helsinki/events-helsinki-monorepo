import classnames from 'classnames';
import { Button } from 'hds-react';
import React from 'react';
import type { SearchTabId, TabsContextType } from '../tabsContext';
import { TabsContext, useTabsContext } from '../tabsContext';
import styles from './searchTabs.module.scss';

export type TabsPropType = {
  id: TabsContextType['activeTab'];
  children: React.ReactNode;
};

export function SearchTab({ id, children }: TabsPropType) {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === id;
  const onClick = () => setActiveTab(id);
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
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

SearchTabs.Tab = SearchTab;
SearchTabs.TabList = SearchTabList;
SearchTabs.Panel = SearchTabPanelContent;
export default SearchTabs;
