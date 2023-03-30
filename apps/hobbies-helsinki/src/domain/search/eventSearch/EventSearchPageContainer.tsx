import { useAppHobbiesTranslation } from '@events-helsinki/components';
import React from 'react';

import AdvancedSearch from './AdvancedSearch';
import SearchPage from './SearchPage';

const EventSearchPageContainer: React.FC = () => {
  const { t: tAppHobbies } = useAppHobbiesTranslation();
  return (
    <SearchPage
      SearchComponent={AdvancedSearch}
      pageTitle={tAppHobbies('appHobbies:search.pageTitle')}
    />
  );
};

export default EventSearchPageContainer;
