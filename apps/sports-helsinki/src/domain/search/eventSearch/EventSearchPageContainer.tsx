import { useAppSportsTranslation } from 'events-helsinki-components';
import React from 'react';

import AdvancedSearch from './AdvancedSearch';
import SearchPage from './SearchPage';

// TODO: Delete the EventSearchPageContainer
/** @deprecated Unnecessary container without any actual features.
 * Use the SearchPage -component directly instead. */
const EventSearchPageContainer: React.FC = () => {
  const { t: tAppSports } = useAppSportsTranslation();
  return (
    <SearchPage
      SearchComponent={AdvancedSearch}
      pageTitle={tAppSports('appSports:search.pageTitle')}
    />
  );
};

export default EventSearchPageContainer;
