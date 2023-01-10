import React from 'react';
import SearchTabs from '../searchTabs/SearchTabs';
import styles from './searchUtilities.module.scss';

type SearchUtilitiesProps = {
  tabs: React.ReactComponentElement<typeof SearchTabs.Tab>[];
};

function SearchUtilities({ tabs }: SearchUtilitiesProps) {
  return (
    <div className={styles.container}>
      <SearchTabs>{tabs}</SearchTabs>
      {/* <div>TODO: Add other utilities like a venues map search switcher</div> */}
    </div>
  );
}

export default SearchUtilities;
