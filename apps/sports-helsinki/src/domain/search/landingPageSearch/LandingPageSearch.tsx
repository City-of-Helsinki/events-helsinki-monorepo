import {
  getCurrentSeason,
  useLocale,
  useCommonTranslation,
} from '@events-helsinki/components';
import { useRouter } from 'next/router';
import React from 'react';
import { HtmlToReact, usePageContext } from 'react-helsinki-headless-cms';
import { ROUTES } from '../../../constants';
import routerHelper from '../../app/routerHelper';
import { CATEGORY_CATALOG } from '../eventSearch/constants';
import { getSportsCategoryOptions } from '../eventSearch/utils';
import styles from './landingPageSearch.module.scss';
import LandingPageSearchForm from './LandingPageSearchForm';
import SearchShortcuts from './SearchShortcuts';

/**
 * Load CMS Page document from Page Context and render it as HTML
 * with <HtmlToReact/> -component.
 */
const CmsPageContent: React.FC = () => {
  const { page } = usePageContext();
  const pageContent = page?.content?.trim() ? page?.content?.trim() : undefined;

  return (
    <>
      {!!pageContent && (
        <div className={styles.pageContent}>
          <HtmlToReact>{pageContent}</HtmlToReact>
        </div>
      )}
    </>
  );
};

const Search: React.FC = () => {
  const { t } = useCommonTranslation();
  const [textSearchInput, setTextSearchInput] = React.useState('');
  const router = useRouter();
  const locale = useLocale();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    router.push({
      pathname: routerHelper.getI18nPath(ROUTES.SEARCH, locale),
      query: {
        text: [textSearchInput],
      },
    });
  };
  const currentSeason = getCurrentSeason();

  const categories = getSportsCategoryOptions(
    t,
    CATEGORY_CATALOG.sportsCategories.landingPage
  );

  return (
    <div>
      <LandingPageSearchForm
        className={styles.landingPageSearch}
        textSearchInput={textSearchInput}
        setTextSearchInput={setTextSearchInput}
        handleSubmit={handleSubmit}
      />
      <CmsPageContent />
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
