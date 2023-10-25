import type { AutosuggestMenuOption } from '@events-helsinki/components';
import {
  getCurrentSeason,
  useUnifiedSearch,
  useLocale,
  useCommonTranslation,
} from '@events-helsinki/components';
import React from 'react';
import { ROUTES } from '../../../constants';
import routerHelper from '../../../domain/app/routerHelper';
import { CATEGORY_CATALOG } from '../eventSearch/constants';
import { getSportsCategoryOptions } from '../eventSearch/utils';
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
        text: [autosuggestInput],
      },
      routerHelper.getI18nPath(ROUTES.SEARCH, locale)
    );
  };

  const handleMenuOptionClick = (option: AutosuggestMenuOption) => {
    setFilters(
      {
        text: [option.text],
      },
      routerHelper.getI18nPath(ROUTES.SEARCH, locale)
    );
  };

  const categories = getSportsCategoryOptions(
    t,
    CATEGORY_CATALOG.sportsCategories.landingPage
  );

  const currentSeason = getCurrentSeason();

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
        categories={categories.filter(
          (category) =>
            !category.seasons ||
            category.seasons.some((season) => season === currentSeason)
        )}
        searchFilters={{}}
      />
    </div>
  );
};

export default Search;
