import type { ParsedUrlQueryInput } from 'querystring';
import {
  Checkbox,
  DateSelector,
  MultiSelectDropdown,
  useAppEventsTranslation,
  useLocale,
  IconRead,
  EVENT_SEARCH_FILTERS,
} from '@events-helsinki/components';
import type { AutosuggestMenuOption } from '@events-helsinki/components';
import classNames from 'classnames';
import { Button, IconSearch, IconLocation } from 'hds-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import queryString from 'query-string';
import type { FormEvent } from 'react';
import React from 'react';
import { PageSection, ContentContainer } from 'react-helsinki-headless-cms';
import SearchAutosuggest from '../../../common-events/components/search/SearchAutosuggest';
import { ROUTES } from '../../../constants';
import routerHelper from '../../../domain/app/routerHelper';
import PlaceSelector from '../../place/placeSelector/PlaceSelector';
import { EVENT_DEFAULT_SEARCH_FILTERS, MAPPED_PLACES } from './constants';
import FilterSummary from './filterSummary/FilterSummary';
import styles from './search.module.scss';
import {
  getEventCategoryOptions,
  getSearchFilters,
  getSearchQuery,
  sortExtendedCategoryOptions,
} from './utils';

interface Props {
  scrollToResultList: () => void;
  'data-testid'?: string;
}

const AdvancedSearch: React.FC<Props> = ({
  scrollToResultList,
  'data-testid': dataTestId,
}) => {
  const { t } = useTranslation('search');
  const { t: tAppEvents } = useAppEventsTranslation();
  const locale = useLocale();
  const router = useRouter();
  const params: { place?: string } = router.query;
  const searchParams = React.useMemo(
    () => new URLSearchParams(queryString.stringify(router.query)),
    [router.query]
  );

  const [categoryInput, setCategoryInput] = React.useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [placeInput, setPlaceInput] = React.useState('');

  const [selectedDateTypes, setSelectedDateTypes] = React.useState<string[]>(
    []
  );
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );
  const [selectedPlaces, setSelectedPlaces] = React.useState<string[]>([]);
  const [start, setStart] = React.useState<Date | null>(null);
  const [end, setEnd] = React.useState<Date | null>(null);
  const [isCustomDate, setIsCustomDate] = React.useState<boolean>(false);
  const [selectedTexts, setSelectedTexts] = React.useState<string[]>([]);
  const [autosuggestInput, setAutosuggestInput] = React.useState('');

  const {
    isFree,
    keyword,
    keywordNot,
    onlyChildrenEvents,
    onlyEveningEvents,
    onlyRemoteEvents,
    publisher,
  } = getSearchFilters(searchParams);

  const searchFilters = {
    [EVENT_SEARCH_FILTERS.CATEGORIES]: selectedCategories,
    [EVENT_SEARCH_FILTERS.DATE_TYPES]: selectedDateTypes,
    [EVENT_SEARCH_FILTERS.END]: end,
    [EVENT_SEARCH_FILTERS.IS_FREE]: isFree,
    [EVENT_SEARCH_FILTERS.KEYWORD]: keyword,
    [EVENT_SEARCH_FILTERS.KEYWORD_NOT]: keywordNot,
    [EVENT_SEARCH_FILTERS.ONLY_CHILDREN_EVENTS]: onlyChildrenEvents,
    [EVENT_SEARCH_FILTERS.ONLY_EVENING_EVENTS]: onlyEveningEvents,
    [EVENT_SEARCH_FILTERS.ONLY_REMOTE_EVENTS]: onlyRemoteEvents,
    [EVENT_SEARCH_FILTERS.PLACES]: selectedPlaces,
    [EVENT_SEARCH_FILTERS.PUBLISHER]: publisher,
    [EVENT_SEARCH_FILTERS.START]: start,
    [EVENT_SEARCH_FILTERS.TEXT]: selectedTexts,
  };

  const categories = getEventCategoryOptions(t).sort(
    sortExtendedCategoryOptions
  );

  const goToSearch = (search: string): void => {
    router.push({
      pathname: routerHelper.getI18nPath(ROUTES.SEARCH, locale),
      query: queryString.parse(search) as ParsedUrlQueryInput,
    });
  };

  const handleChangeDateTypes = (value: string[]) => {
    setSelectedDateTypes(value);
  };

  const toggleIsCustomDate = () => {
    setIsCustomDate(!isCustomDate);
  };

  const moveToSearchPage = () => {
    const filters = {
      ...searchFilters,
      ...{ [EVENT_SEARCH_FILTERS.TEXT]: [autosuggestInput] },
    };
    const search = getSearchQuery(filters);

    goToSearch(search);
  };

  // Initialize fields when page is loaded
  React.useEffect(() => {
    const {
      [EVENT_SEARCH_FILTERS.CATEGORIES]: categories,
      [EVENT_SEARCH_FILTERS.DATE_TYPES]: dateTypes,
      [EVENT_SEARCH_FILTERS.END]: endTime,
      [EVENT_SEARCH_FILTERS.PLACES]: places,
      [EVENT_SEARCH_FILTERS.START]: startTime,
      [EVENT_SEARCH_FILTERS.TEXT]: text,
    } = getSearchFilters(searchParams);

    const pathPlace = params.place && MAPPED_PLACES[params.place.toLowerCase()];

    if (pathPlace) {
      places.push(pathPlace);
    }

    setSelectedCategories(categories);
    setSelectedPlaces(places);
    setSelectedTexts(text || []);
    setEnd(endTime);
    setStart(startTime);

    if (endTime || startTime) {
      setIsCustomDate(true);
    } else {
      setSelectedDateTypes(dateTypes);
    }
    setAutosuggestInput(text?.toString() || '');
  }, [searchParams, params]);

  const handleMenuOptionClick = async (option: AutosuggestMenuOption) => {
    const value = option.text;

    const { [EVENT_SEARCH_FILTERS.TEXT]: text } =
      getSearchFilters(searchParams);

    if (value && !text?.includes(value)) {
      text?.push(value);
    }

    const search = getSearchQuery({
      ...searchFilters,
      [EVENT_SEARCH_FILTERS.TEXT]: text,
    });

    setSelectedTexts(text || []);
    goToSearch(search);
    scrollToResultList();
  };

  const handleOnlyEveningEventChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const search = getSearchQuery({
      ...searchFilters,
      [EVENT_SEARCH_FILTERS.ONLY_EVENING_EVENTS]: e.target.checked,
    });
    goToSearch(search);
  };

  const handleOnlyRemoteEventChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const search = getSearchQuery({
      ...searchFilters,
      [EVENT_SEARCH_FILTERS.ONLY_REMOTE_EVENTS]: e.target.checked,
    });
    goToSearch(search);
  };

  const handleIsFreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchQuery({
      ...searchFilters,
      [EVENT_SEARCH_FILTERS.IS_FREE]: e.target.checked,
    });
    goToSearch(search);
  };

  const handleOnlyChildrenEventChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const search = getSearchQuery({
      ...searchFilters,
      [EVENT_SEARCH_FILTERS.ONLY_CHILDREN_EVENTS]: e.target.checked,
    });

    goToSearch(search);
  };

  const clearInputValues = () => {
    setCategoryInput('');
    setPlaceInput('');
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
            <h1>{t('search.labelSearchField')}</h1>
            <div className={styles.rowWrapper}>
              <div className={classNames(styles.row, styles.autoSuggestRow)}>
                <div>
                  <SearchAutosuggest
                    name="search"
                    onChangeSearchValue={setAutosuggestInput}
                    onOptionClick={handleMenuOptionClick}
                    placeholder={tAppEvents(
                      'appEvents:search.search.placeholder'
                    )}
                    searchValue={autosuggestInput}
                  />
                </div>
              </div>
            </div>
            <div className={styles.rowWrapper}>
              <div className={styles.row}>
                <div>
                  <MultiSelectDropdown
                    checkboxName="categoryOptions"
                    icon={<IconRead aria-hidden />}
                    inputValue={categoryInput}
                    name="category"
                    onChange={setSelectedCategories}
                    options={categories}
                    setInputValue={setCategoryInput}
                    showSearch={false}
                    title={t('search.titleDropdownCategory')}
                    value={selectedCategories}
                  />
                </div>
                <div className={styles.dateSelectorWrapper}>
                  <DateSelector
                    dateTypes={selectedDateTypes}
                    endDate={end}
                    isCustomDate={isCustomDate}
                    name="date"
                    onChangeDateTypes={handleChangeDateTypes}
                    onChangeEndDate={setEnd}
                    onChangeStartDate={setStart}
                    startDate={start}
                    toggleIsCustomDate={toggleIsCustomDate}
                  />
                </div>
                <div>
                  <PlaceSelector
                    checkboxName="placesCheckboxes"
                    icon={<IconLocation aria-hidden />}
                    inputValue={placeInput}
                    name="places"
                    onChange={setSelectedPlaces}
                    selectAllText={t('search.selectAllPlaces')}
                    setInputValue={setPlaceInput}
                    showSearch={true}
                    showSelectAll={true}
                    title={t('search.titleDropdownPlace')}
                    value={selectedPlaces}
                  />
                </div>
              </div>
            </div>
            <div className={styles.rowWrapper}>
              <div className={styles.row}>
                <div>
                  <Checkbox
                    className={styles.checkbox}
                    checked={isFree}
                    id={EVENT_SEARCH_FILTERS.IS_FREE}
                    label={t('search.checkboxIsFree')}
                    onChange={handleIsFreeChange}
                  />
                </div>
                <div>
                  <Checkbox
                    className={styles.checkbox}
                    checked={onlyEveningEvents}
                    id={EVENT_SEARCH_FILTERS.ONLY_EVENING_EVENTS}
                    label={t('search.checkboxOnlyEveningEvents')}
                    onChange={handleOnlyEveningEventChange}
                  />
                </div>
              </div>
            </div>
            <div className={styles.rowWrapper}>
              <div className={styles.row}>
                <div>
                  <Checkbox
                    className={styles.checkbox}
                    checked={onlyChildrenEvents}
                    id={EVENT_SEARCH_FILTERS.ONLY_CHILDREN_EVENTS}
                    label={t('search.checkboxOnlyChildrenEvents')}
                    onChange={handleOnlyChildrenEventChange}
                  />
                </div>
                <div>
                  <Checkbox
                    className={styles.checkbox}
                    checked={onlyRemoteEvents}
                    id={EVENT_SEARCH_FILTERS.ONLY_REMOTE_EVENTS}
                    label={t('search.checkboxOnlyRemoteEvents')}
                    onChange={handleOnlyRemoteEventChange}
                  />
                </div>
                <div className={styles.buttonWrapper}>
                  <Button
                    fullWidth={true}
                    iconLeft={<IconSearch aria-hidden />}
                    type="submit"
                    variant="success"
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
