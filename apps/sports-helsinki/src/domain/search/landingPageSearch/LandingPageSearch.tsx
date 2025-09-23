import {
  getCurrentSeason,
  useLocale,
  useCommonTranslation,
} from '@events-helsinki/components';
import { useRouter } from 'next/router';
import React from 'react';
import { ROUTES } from '../../../constants';
import routerHelper from '../../app/routerHelper';
import { CATEGORY_CATALOG } from '../eventSearch/constants';
import { getSportsCategoryOptions } from '../eventSearch/utils';
import styles from './landingPageSearch.module.scss';
import LandingPageSearchForm from './LandingPageSearchForm';
import SearchShortcuts from './SearchShortcuts';

const Search: React.FC = () => {
  const { t } = useCommonTranslation();
  const [textSearchInput, setTextSearchInput] = React.useState('');
  const router = useRouter();
  const locale = useLocale();
  const handleSubmit = (): void => {
    router.push({
      pathname: routerHelper.getI18nPath(ROUTES.SEARCH, locale),
      query: {
        text: [textSearchInput],
      },
    });
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
        textSearchInput={textSearchInput}
        setTextSearchInput={setTextSearchInput}
        handleSubmit={handleSubmit}
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
