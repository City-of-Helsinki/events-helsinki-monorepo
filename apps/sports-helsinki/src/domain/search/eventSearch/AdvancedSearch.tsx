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

interface Props {
  scrollToResultList: () => void;
  'data-testid'?: string;
}

const AdvancedSearch: React.FC<Props> = ({
  scrollToResultList,
  'data-testid': dataTestId,
}) => {
  const { t } = useTranslation('search');
  const { t: tAppSports } = useAppSportsTranslation();
  const locale = useLocale();
  const router = useRouter();
  const params: { place?: string; eventType?: string[] } = router.query;
  const searchParams = React.useMemo(
    () => new URLSearchParams(qs.stringify(router.query)),
    [router.query]
  );
  const [selectedEventType, setSelectedEventType] = React.useState<string[]>(
    []
  );
  const [selectedTexts, setSelectedTexts] = React.useState<string[]>([]);
  const [autosuggestInput, setAutosuggestInput] = React.useState('');
  const [selectedPlaces, setSelectedPlaces] = React.useState<string[]>([]);
  const { start, end, keyword, keywordNot, publisher, dateTypes } =
    getSearchFilters(searchParams);

  const searchFilters = {
    dateTypes,
    start,
    end,
    keyword,
    keywordNot,
    places: selectedPlaces,
    publisher,
    text: selectedTexts,
    eventType: selectedEventType,
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
    const { places, text, eventType } = getSearchFilters(searchParams);

    const placeSearchParam =
      params.place && MAPPED_PLACES[params.place.toLowerCase()];
    const eventTypeSearchParam = params.eventType;

    if (placeSearchParam) {
      places.push(placeSearchParam);
    }
    if (eventTypeSearchParam) {
      eventType?.push(...eventTypeSearchParam);
    }
    setSelectedPlaces(places);
    setSelectedEventType(eventType);
    setSelectedTexts(text || []);
    setAutosuggestInput(text?.toString() || '');
  }, [searchParams, params]);

  const handleMenuOptionClick = async (option: AutosuggestMenuOption) => {
    const value = option.text;

    const { text } = getSearchFilters(searchParams);

    if (value && !text?.includes(value)) {
      text?.push(value);
    }

    const search = getSearchQuery({
      ...searchFilters,
      text,
    });

    setSelectedTexts(text || []);
    goToSearch(search);
    scrollToResultList();
  };

  const clearInputValues = () => {
    setAutosuggestInput('');
  };

  const clearFilters = () => {
    const search = getSearchQuery(EVENT_DEFAULT_SEARCH_FILTERS);
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
    <PageSection
      korosBottom
      korosBottomClassName={styles.searchContainerKoros}
      className={styles.searchContainer}
      data-testid={dataTestId}
    >
      <ContentContainer className={styles.contentContainer}>
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
                    placeholder={tAppSports(
                      'appSports:search.search.placeholder'
                    )}
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
      </ContentContainer>
    </PageSection>
  );
};

export default AdvancedSearch;
