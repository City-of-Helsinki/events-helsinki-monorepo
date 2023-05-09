import type { ParsedUrlQueryInput } from 'querystring';
import type { AutosuggestMenuOption } from '@events-helsinki/components';
import {
  buildQueryFromObject,
  useLocale,
  useCommonTranslation,
  MultiSelectDropdown,
  getUrlParamAsArray,
  useAppSportsTranslation,
} from '@events-helsinki/components';
import classNames from 'classnames';
import { Button, IconSearch } from 'hds-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import qs, { parse } from 'query-string';
import type { FormEvent } from 'react';
import React from 'react';
import IconPersonRunning from '../../../assets/icons/IconPersonRunning';
import SearchAutosuggest from '../../../common-events/components/search/SearchAutosuggest';
import { SEARCH_ROUTES } from '../../../constants';
import routerHelper from '../../../domain/app/routerHelper';
import { PARAM_SEARCH_TYPE } from '../combinedSearch/constants';
import type { SearchForm, SearchComponentType } from '../combinedSearch/types';
import { EVENT_SEARCH_FILTERS } from '../eventSearch/constants';
import FilterSummary from '../eventSearch/filterSummary/FilterSummary';
import {
  getSportsCategoryOptions,
  sortExtendedCategoryOptions,
} from '../eventSearch/utils';
import styles from './search.module.scss';

export type SearchUtilitiesProps = {
  switchShowMode: () => void;
};

export type SearchComponentProps = {
  'data-testid'?: string;
  korosBottom?: boolean;
  searchUtilities?: React.ReactNode;
  className?: string;
} & SearchComponentType;

export const useSimpleVenueSearchForm = ({
  scrollToResultList,
  searchRoute,
  autosuggestInput,
  selectedSportsCategories,
  setAutosuggestInput,
  setSelectedSportsCategories,
  setSportsCategoryInput,
}: {
  scrollToResultList: SearchComponentProps['scrollToResultList'];
  searchRoute: SearchComponentProps['searchRoute'];
  autosuggestInput: string;
  selectedSportsCategories: string[];
  setAutosuggestInput: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSportsCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setSportsCategoryInput: React.Dispatch<React.SetStateAction<string>>;
}): SearchForm => {
  const locale = useLocale();
  const router = useRouter();

  const searchParams = React.useMemo(
    () => new URLSearchParams(qs.stringify(router.query)),
    [router.query]
  );

  const searchFilters = {
    q: autosuggestInput,
    sportsCategories: selectedSportsCategories,
    orderBy: searchParams.get('orderBy'),
    orderDir: searchParams.get('orderDir'),
    sort: searchParams.get('sort'),
  };

  const goToSearch = (search: string): void => {
    if (searchRoute) {
      router.push({
        pathname: routerHelper.getI18nPath(searchRoute, locale),
        query: parse(search) as ParsedUrlQueryInput,
      });
    }
  };

  const moveToSearchPage = () => {
    const filters = {
      [PARAM_SEARCH_TYPE]: router.query[PARAM_SEARCH_TYPE],
      ...searchFilters,
    };
    const search = buildQueryFromObject(filters);
    goToSearch(search);
  };

  const clearInputValues = () => {
    setAutosuggestInput('');
    setSelectedSportsCategories([]);
    setSportsCategoryInput('');
  };

  const clearFilters = () => {
    const search = '';
    goToSearch(search);
    clearInputValues();
  };

  const handleSubmit = (event?: FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    moveToSearchPage();
    scrollToResultList && scrollToResultList();
  };

  const updateFilters = React.useCallback(() => {
    const sportsCategories = getUrlParamAsArray(
      searchParams,
      EVENT_SEARCH_FILTERS.SPORTS_CATEGORIES
    );
    setAutosuggestInput(searchParams.get('q') ?? '');
    setSelectedSportsCategories(sportsCategories);
  }, [searchParams, setAutosuggestInput, setSelectedSportsCategories]);

  return {
    searchParams,
    goToSearch,
    moveToSearchPage,
    clearInputValues,
    clearFilters,
    handleSubmit,
    updateFilters,
    searchFilters,
    scrollToResultList,
  };
};

export const SimpleVenueSearchForm: React.FC<SearchComponentType> = ({
  scrollToResultList,
  showTitle = false,
  searchRoute = SEARCH_ROUTES.SEARCH,
}) => {
  const { t } = useTranslation('search');
  const { t: tAppSports } = useAppSportsTranslation();
  const [autosuggestInput, setAutosuggestInput] = React.useState('');
  const [selectedSportsCategories, setSelectedSportsCategories] =
    React.useState<string[]>([]);
  const [sportsCategoryInput, setSportsCategoryInput] = React.useState('');
  const sportsCategories = getSportsCategoryOptions(t).sort(
    sortExtendedCategoryOptions
  );

  const { goToSearch, clearFilters, handleSubmit, updateFilters } =
    useSimpleVenueSearchForm({
      scrollToResultList,
      searchRoute,
      autosuggestInput,
      selectedSportsCategories,
      setAutosuggestInput,
      setSelectedSportsCategories,
      setSportsCategoryInput,
    });

  const handleMenuOptionClick = async (option: AutosuggestMenuOption) => {
    const value = option.text;
    const search = buildQueryFromObject({ q: value });
    goToSearch(search);
    scrollToResultList && scrollToResultList();
  };

  React.useEffect(() => {
    updateFilters();
  }, [updateFilters]);

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.searchWrapper}>
        {showTitle && (
          <h1 className={styles.searchTitle}>{t('search.labelSearchField')}</h1>
        )}
        <div className={styles.rowWrapper}>
          <div className={classNames(styles.row, styles.autoSuggestRow)}>
            <div>
              <SearchAutosuggest
                name="search"
                onChangeSearchValue={setAutosuggestInput}
                onOptionClick={handleMenuOptionClick}
                placeholder={tAppSports('appSports:search.search.placeholder')}
                searchValue={autosuggestInput}
              />
            </div>
            <div>
              <MultiSelectDropdown
                checkboxName="sportsCategoryOptions"
                icon={<IconPersonRunning aria-hidden />}
                inputValue={sportsCategoryInput}
                name="sportsCategory"
                onChange={setSelectedSportsCategories}
                options={sportsCategories}
                setInputValue={setSportsCategoryInput}
                showSearch={false}
                title={t('search.titleDropdownSportsCategory')}
                value={selectedSportsCategories}
              />
            </div>
          </div>
          <div className={styles.rowWrapper}>
            <div className={styles.row}>
              <div className={styles.buttonWrapper}>
                <Button
                  variant="success"
                  fullWidth={true}
                  iconLeft={<IconSearch aria-hidden />}
                  type="submit"
                >
                  {t('search.buttonSearch')}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <FilterSummary onClear={clearFilters} />
      </div>
    </form>
  );
};

export const VenueSearchUtilities: React.FC<SearchUtilitiesProps> = ({
  switchShowMode,
}) => {
  const { t } = useCommonTranslation();
  return (
    <>
      <Button variant="secondary" theme="black" onClick={switchShowMode}>
        {t('common:mapSearch.showOnMap')}
      </Button>
    </>
  );
};

const SimpleVenueSearch: React.FC<SearchComponentProps> = ({
  'data-testid': dataTestId,
  className,
  ...delegatedSimpleVenueSearchFormProps
}) => {
  return <SimpleVenueSearchForm {...delegatedSimpleVenueSearchFormProps} />;
};
export default SimpleVenueSearch;
