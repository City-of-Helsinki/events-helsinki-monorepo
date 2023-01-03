import React from 'react';
import type { SearchTab } from './SearchTabs';
import SearchTabs from './SearchTabs';
import styles from './searchUtilities.module.scss';

type SearchUtilitiesProps = {
  tabs: React.ReactComponentElement<typeof SearchTab>[];
};

const SearchUtilities: React.FC<SearchUtilitiesProps> = ({ tabs }) => {
  return (
    <div className={styles.container}>
      <SearchTabs>{tabs}</SearchTabs>
      {/* <div>TODO: Add other utilities like a venues map search switcher</div> */}
    </div>
  );
};

export default SearchUtilities;
