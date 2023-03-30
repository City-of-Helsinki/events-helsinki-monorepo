import { useAppEventsTranslation } from '@events-helsinki/components';
import React from 'react';

import AdvancedSearch from './AdvancedSearch';
import SearchPage from './SearchPage';

const EventSearchPageContainer: React.FC = () => {
  const { t: tAppEvents } = useAppEventsTranslation();
  return (
    <SearchPage
      SearchComponent={AdvancedSearch}
      pageTitle={tAppEvents('appEvents:search.pageTitle')}
    />
  );
};

export default EventSearchPageContainer;
