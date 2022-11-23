import { useAppSportsTranslation } from 'events-helsinki-components';
import React from 'react';

import AdvancedSearch from './AdvancedSearch';
import SearchPage from './SearchPage';

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
