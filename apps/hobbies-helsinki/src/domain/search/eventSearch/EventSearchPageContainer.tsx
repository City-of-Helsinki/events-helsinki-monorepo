import React from 'react';
import { useTranslation } from 'react-i18next';

import AdvancedSearch from './AdvancedSearch';
import SearchPage from './SearchPage';

const EventSearchPageContainer: React.FC = () => {
  const { t } = useTranslation('search');
  return <SearchPage SearchComponent={AdvancedSearch} pageTitle={t('title')} />;
};

export default EventSearchPageContainer;
