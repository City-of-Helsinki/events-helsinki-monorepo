import type { ParsedUrlQueryInput } from 'querystring';
import {
  useAppSportsTranslation,
  useLocale,
} from '@events-helsinki/components';
import type { AutosuggestMenuOption } from '@events-helsinki/components';
import classNames from 'classnames';
import { Button, IconSearch } from 'hds-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import qs, { parse } from 'query-string';
import type { FormEvent } from 'react';
import React from 'react';
import { PageSection, ContentContainer } from 'react-helsinki-headless-cms';
import SearchAutosuggest from '../../../common-events/components/search/SearchAutosuggest';
import { ROUTES } from '../../../constants';
import routerHelper from '../../../domain/app/routerHelper';
import type { SearchForm, SearchComponentType } from '../combinedSearch/types';
import { EVENT_DEFAULT_SEARCH_FILTERS, MAPPED_PLACES } from './constants';
import FilterSummary from './filterSummary/FilterSummary';
import styles from './search.module.scss';
import type { Filters } from './types';
import { getSearchFilters, getSearchQuery } from './utils';

type AdvancedSearchFormProps = SearchComponentType;

export type AdvancedSearchProps = {
  'data-testid'?: string;
} & AdvancedSearchFormProps;

/**
 * @deprecated not in use after the creation of the combined search.
 * Can be used as an example how to refactor the Hobbies and the Events apps.
 * */
export const useAdvancedSearchForm = ({
  scrollToResultList,
  autosuggestInput,
  setAutosuggestInput,
}: {
  scrollToResultList: AdvancedSearchFormProps['scrollToResultList'];
  autosuggestInput: string;
  setAutosuggestInput: React.Dispatch<React.SetStateAction<string>>;
}): SearchForm => {
  const locale = useLocale();
  const router = useRouter();
  const params: { place?: string } = router.query;
  const [selectedPlaces, setSelectedPlaces] = React.useState<string[]>([]);
  const searchParams = React.useMemo(
    () => new URLSearchParams(qs.stringify(router.query)),
    [router.query]
  );

  const {
    start,
    end,
    keyword,
    keywordNot,
    publisher,
    dateTypes,
    sportsCategories,
    eventType,
    q,
  } = getSearchFilters(searchParams);

  const searchFilters = {
    dateTypes,
    sportsCategories,
    start,
    end,
    keyword,
    keywordNot,
    places: selectedPlaces,
    publisher,
    q,
    eventType,
  };

  const goToSearch = (search: string): void => {
    router.push({
      pathname: routerHelper.getI18nPath(ROUTES.SEARCH, locale),
      query: parse(search) as ParsedUrlQueryInput,
    });
  };

  const moveToSearchPage = () => {
    const filters = {
      ...searchFilters,
      ...{ q: [autosuggestInput] },
    };
    const search = getSearchQuery(filters);

    goToSearch(search);
  };

  const updateFilters = React.useCallback(() => {
    const { places, q } = getSearchFilters(searchParams);

    const placeSearchParam =
      params.place && MAPPED_PLACES[params.place.toLowerCase()];

    if (placeSearchParam) {
      places.push(placeSearchParam);
    }
    setSelectedPlaces(places);
    setAutosuggestInput(q?.toString() || '');
  }, [params.place, searchParams, setAutosuggestInput]);

  const clearInputValues = () => {
    setAutosuggestInput('');
  };

  const clearFilters = () => {
    const search = getSearchQuery({
      ...EVENT_DEFAULT_SEARCH_FILTERS,
      eventType,
    });
    goToSearch(search);
    clearInputValues();
  };

  const handleSubmit = (event?: FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    moveToSearchPage();
    setAutosuggestInput('');
    scrollToResultList();
  };

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

/**
 * @deprecated not in use after the creation of the combined search.
 * Can be used as an example how to refactor the Hobbies and the Events apps.
 * */
export const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = ({
  scrollToResultList,
}) => {
  const { t } = useTranslation('search');
  const { t: tAppSports } = useAppSportsTranslation();

  const [autosuggestInput, setAutosuggestInput] = React.useState('');

  const {
    handleSubmit,
    clearFilters,
    goToSearch,
    updateFilters,
    searchFilters,
  } = useAdvancedSearchForm({
    scrollToResultList,
    autosuggestInput,
    setAutosuggestInput,
  });

  const handleMenuOptionClick = async (option: AutosuggestMenuOption) => {
    const value = option.text;

    const search = getSearchQuery({
      ...(searchFilters as Filters),
      q: [value],
    });

    goToSearch(search);
    scrollToResultList();
  };

  // Initialize fields when page is loaded
  React.useEffect(() => {
    updateFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.searchWrapper}>
        <h1>{t('search.labelSearchField')}</h1>
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
        <FilterSummary onClear={clearFilters} />
      </div>
    </form>
  );
};

/**
 * @deprecated not in use after the creation of the combined search.
 * Can be used as an example how to refactor the Hobbies and the Events apps.
 * */
const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  'data-testid': dataTestId,
  ...delegatedAdvancedSearchFormProps
}) => {
  return (
    <PageSection
      korosBottom
      korosBottomClassName={styles.searchContainerKoros}
      className={styles.searchContainer}
      data-testid={dataTestId}
    >
      <ContentContainer className={styles.contentContainer}>
        <AdvancedSearchForm {...delegatedAdvancedSearchFormProps} />
      </ContentContainer>
    </PageSection>
  );
};

export default AdvancedSearch;
