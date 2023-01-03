import type { ParsedUrlQueryInput } from 'querystring';
import classNames from 'classnames';
import { useAppSportsTranslation, useLocale } from 'events-helsinki-components';
import type { AutosuggestMenuOption } from 'events-helsinki-components';
import { Button, IconSearch } from 'hds-react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import qs, { parse } from 'query-string';
import type { FormEvent } from 'react';
import React from 'react';
import { PageSection, ContentContainer } from 'react-helsinki-headless-cms';
import SearchAutosuggest from '../../../common-events/components/search/SearchAutosuggest';
import { ROUTES } from '../../../constants';
import { getI18nPath } from '../../../utils/routerUtils';
import { EVENT_DEFAULT_SEARCH_FILTERS, MAPPED_PLACES } from './constants';
import FilterSummary from './filterSummary/FilterSummary';
import styles from './search.module.scss';
import { getSearchFilters, getSearchQuery } from './utils';

type AdvancedSearchFormProps = {
  scrollToResultList: () => void;
};

export type AdvancedSearchProps = {
  'data-testid'?: string;
} & AdvancedSearchFormProps;

export const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = ({
  scrollToResultList,
}) => {
  const { t } = useTranslation('search');
  const { t: tAppSports } = useAppSportsTranslation();
  const locale = useLocale();
  const router = useRouter();
  const params: { place?: string } = router.query;
  const searchParams = React.useMemo(
    () => new URLSearchParams(qs.stringify(router.query)),
    [router.query]
  );
  const [autosuggestInput, setAutosuggestInput] = React.useState('');
  const [selectedPlaces, setSelectedPlaces] = React.useState<string[]>([]);
  const {
    start,
    end,
    keyword,
    keywordNot,
    publisher,
    dateTypes,
    eventType,
    text,
  } = getSearchFilters(searchParams);

  const searchFilters = {
    dateTypes,
    start,
    end,
    keyword,
    keywordNot,
    places: selectedPlaces,
    publisher,
    text,
    eventType,
  };

  const goToSearch = (search: string): void => {
    router.push({
      pathname: getI18nPath(ROUTES.COURSESEARCH, locale),
      query: parse(search) as ParsedUrlQueryInput,
    });
  };

  const moveToSearchPage = () => {
    const filters = {
      ...searchFilters,
      ...{ text: [autosuggestInput] },
    };
    const search = getSearchQuery(filters);

    goToSearch(search);
  };

  // Initialize fields when page is loaded
  React.useEffect(() => {
    const { places, text } = getSearchFilters(searchParams);

    const placeSearchParam =
      params.place && MAPPED_PLACES[params.place.toLowerCase()];

    if (placeSearchParam) {
      places.push(placeSearchParam);
    }
    setSelectedPlaces(places);
    setAutosuggestInput(text?.toString() || '');
  }, [searchParams, params]);

  const handleMenuOptionClick = async (option: AutosuggestMenuOption) => {
    const value = option.text;

    const search = getSearchQuery({
      ...searchFilters,
      text: [value],
    });

    goToSearch(search);
    scrollToResultList();
  };

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

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.searchWrapper}>
        <h2>{t('search.labelSearchField')}</h2>
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
