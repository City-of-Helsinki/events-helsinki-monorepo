import type { AutosuggestMenuOption } from 'events-helsinki-components';
import {
  useUnifiedSearch,
  useLocale,
  useCommonTranslation,
  EventTypeId,
} from 'events-helsinki-components';
import React from 'react';

import { ROUTES } from '../../../constants';
import { getI18nPath } from '../../../utils/routerUtils';
import { CATEGORY_CATALOG } from '../eventSearch/constants';
import { getEventCategoryOptions } from '../eventSearch/utils';
import styles from './landingPageSearch.module.scss';
import LandingPageSearchForm from './LandingPageSearchForm';
import SearchShortcuts from './SearchShortcuts';

const Search: React.FC = () => {
  const { t } = useCommonTranslation();
  const [autosuggestInput, setAutosuggestInput] = React.useState('');
  const { setFilters } = useUnifiedSearch();
  const locale = useLocale();
  const handleSubmit = () => {
    setFilters(
      {
        q: [autosuggestInput],
        // Order by relevance if a search filter is applied
        // orderBy: autosuggestInput ? OrderBy.relevance : undefined,
      },
      getI18nPath(ROUTES.SEARCH, locale)
    );
  };

  const handleMenuOptionClick = (option: AutosuggestMenuOption) => {
    setFilters(
      {
        q: [option.text],
        // Order by relevance if a search filter is applied
        // orderBy: autosuggestInput ? OrderBy.relevance : undefined,
      },
      getI18nPath(ROUTES.SEARCH, locale)
    );
  };

  const categories = getEventCategoryOptions(
    t,
    CATEGORY_CATALOG[EventTypeId.Course].landingPage
  );

  return (
    <div>
      <LandingPageSearchForm
        className={styles.landingPageSearch}
        autosuggestInput={autosuggestInput}
        setAutosuggestInput={setAutosuggestInput}
        handleSubmit={handleSubmit}
        handleMenuOptionClick={handleMenuOptionClick}
      />
      <SearchShortcuts
        className={styles.categoriesWrapper}
        categories={categories}
        searchFilters={{}}
      />
    </div>
  );
};

export default Search;
