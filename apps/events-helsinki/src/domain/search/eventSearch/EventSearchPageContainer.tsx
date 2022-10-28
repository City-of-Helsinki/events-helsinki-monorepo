import { useSearchTranslation } from 'events-helsinki-components';
import React from 'react';

import AdvancedSearch from './AdvancedSearch';
import SearchPage from './SearchPage';

const EventSearchPageContainer: React.FC = () => {
  const { t } = useSearchTranslation();
  return (
    <SearchPage
      SearchComponent={AdvancedSearch}
      pageTitle={t('search:title')}
    />
  );
};

export default EventSearchPageContainer;
