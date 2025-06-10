import type { ParsedUrlQueryInput } from 'querystring';
import {
  Checkbox,
  DateSelector,
  EVENT_SEARCH_FILTERS,
  IconRead,
  MultiSelectDropdown,
  RangeDropdown,
  useAppHobbiesTranslation,
  useLocale,
} from '@events-helsinki/components';
import type { AutosuggestMenuOption } from '@events-helsinki/components';
import classNames from 'classnames';
import {
  Button,
  IconCake,
  IconSearch,
  IconLocation,
  IconGroup,
  IconMinus,
} from 'hds-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import queryString from 'query-string';
import type { FormEvent } from 'react';
import React from 'react';
import { PageSection, ContentContainer } from 'react-helsinki-headless-cms';
import SearchAutosuggest from '../../../common-events/components/search/SearchAutosuggest';
import { ROUTES } from '../../../constants';
import routerHelper from '../../app/routerHelper';
import PlaceSelector from '../../place/placeSelector/PlaceSelector';
import { COURSE_DEFAULT_SEARCH_FILTERS, MAPPED_PLACES } from './constants';
import FilterSummary from './filterSummary/FilterSummary';
import styles from './search.module.scss';
import {
  getCourseHobbyTypeOptions,
  getEventCategoryOptions,
  getSearchFilters,
  getSearchQuery,
  MAX_AGE,
  MIN_AGE,
} from './utils';

interface Props {
  scrollToResultList: () => void;
  'data-testid'?: string;
}

const useSearchFormState = () => {
  const router = useRouter();
  const params: { place?: string } = router.query;
  const searchParams = React.useMemo(
    () => new URLSearchParams(queryString.stringify(router.query)),
    [router.query]
  );
  const [categoryInput, setCategoryInput] = React.useState('');
  const [hobbyTypeInput, setHobbyTypeInput] = React.useState('');
  const [selectedHobbyTypes, setSelectedHobbyTypes] = React.useState<string[]>(
    []
  );
  const [minAgeInput, setMinAgeInput] = React.useState('');
  const [maxAgeInput, setMaxAgeInput] = React.useState('');
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

  // Initialize fields when page is loaded
  React.useEffect(() => {
    const {
      [EVENT_SEARCH_FILTERS.CATEGORIES]: categories,
      [EVENT_SEARCH_FILTERS.HOBBY_TYPES]: hobbyTypes,
      [EVENT_SEARCH_FILTERS.DATE_TYPES]: dateTypes,
      [EVENT_SEARCH_FILTERS.END]: endTime,
      [EVENT_SEARCH_FILTERS.PLACES]: places,
      [EVENT_SEARCH_FILTERS.START]: startTime,
      [EVENT_SEARCH_FILTERS.TEXT]: text,
      [EVENT_SEARCH_FILTERS.MIN_AGE]: audienceMinAgeLt,
      [EVENT_SEARCH_FILTERS.MAX_AGE]: audienceMaxAgeGt,
    } = getSearchFilters(searchParams);

    const pathPlace = params.place && MAPPED_PLACES[params.place.toLowerCase()];

    if (pathPlace) {
      places.push(pathPlace);
    }

    setSelectedCategories(categories);
    setSelectedHobbyTypes(hobbyTypes || []);
    setSelectedPlaces(places);
    setSelectedTexts(text || []);
    setEnd(endTime);
    setStart(startTime);
    setMinAgeInput(audienceMinAgeLt || '');
    setMaxAgeInput(audienceMaxAgeGt || '');

    if (endTime || startTime) {
      setIsCustomDate(true);
    } else {
      setSelectedDateTypes(dateTypes);
    }
    setAutosuggestInput(text?.toString() || '');
  }, [searchParams, params]);

  return {
    categoryInput,
    setCategoryInput,
    hobbyTypeInput,
    setHobbyTypeInput,
    selectedHobbyTypes,
    setSelectedHobbyTypes,
    minAgeInput,
    setMinAgeInput,
    maxAgeInput,
    setMaxAgeInput,
    placeInput,
    setPlaceInput,
    selectedDateTypes,
    setSelectedDateTypes,
    selectedCategories,
    setSelectedCategories,
    selectedPlaces,
    setSelectedPlaces,
    start,
    setStart,
    end,
    setEnd,
    isCustomDate,
    setIsCustomDate,
    selectedTexts,
    setSelectedTexts,
    autosuggestInput,
    setAutosuggestInput,
  };
};

const useGoToSearch = () => {
  const locale = useLocale();
  const router = useRouter();

  return (search: string): void => {
    router.push({
      pathname: routerHelper.getI18nPath(ROUTES.SEARCH, locale),
      query: queryString.parse(search) as ParsedUrlQueryInput,
    });
  };
};

const AdvancedSearch: React.FC<Props> = ({
  scrollToResultList,
  'data-testid': dataTestId,
}) => {
  const { t } = useTranslation('search');
  const { t: tAppHobbies } = useAppHobbiesTranslation();
  const router = useRouter();
  const searchParams = React.useMemo(
    () => new URLSearchParams(queryString.stringify(router.query)),
    [router.query]
  );

  const {
    categoryInput,
    setCategoryInput,
    hobbyTypeInput,
    setHobbyTypeInput,
    selectedHobbyTypes,
    setSelectedHobbyTypes,
    minAgeInput,
    setMinAgeInput,
    maxAgeInput,
    setMaxAgeInput,
    placeInput,
    setPlaceInput,
    selectedDateTypes,
    setSelectedDateTypes,
    selectedCategories,
    setSelectedCategories,
    selectedPlaces,
    setSelectedPlaces,
    start,
    setStart,
    end,
    setEnd,
    isCustomDate,
    setIsCustomDate,
    selectedTexts,
    setSelectedTexts,
    autosuggestInput,
    setAutosuggestInput,
  } = useSearchFormState();

  const searchFilters = {
    ...getSearchFilters(searchParams),
    [EVENT_SEARCH_FILTERS.CATEGORIES]: selectedCategories,
    [EVENT_SEARCH_FILTERS.HOBBY_TYPES]: selectedHobbyTypes,
    [EVENT_SEARCH_FILTERS.DATE_TYPES]: selectedDateTypes,
    [EVENT_SEARCH_FILTERS.END]: end,
    [EVENT_SEARCH_FILTERS.PLACES]: selectedPlaces,
    [EVENT_SEARCH_FILTERS.START]: start,
    [EVENT_SEARCH_FILTERS.TEXT]: selectedTexts,
    [EVENT_SEARCH_FILTERS.MIN_AGE]: minAgeInput,
    [EVENT_SEARCH_FILTERS.MAX_AGE]: maxAgeInput,
  };

  const categories = getEventCategoryOptions(t);
  const hobbyTypes = getCourseHobbyTypeOptions(t);

  const goToSearch = useGoToSearch();

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

  const handleMenuOptionClick = async (option: AutosuggestMenuOption) => {
    const value = option.text;

    const { [EVENT_SEARCH_FILTERS.TEXT]: textSearch } =
      getSearchFilters(searchParams);

    if (value && !textSearch?.includes(value)) {
      textSearch?.push(value);
    }

    const search = getSearchQuery({
      ...searchFilters,
      [EVENT_SEARCH_FILTERS.TEXT]: textSearch,
    });

    setSelectedTexts(textSearch || []);
    goToSearch(search);
    scrollToResultList();
  };

  const handleIsFreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchQuery({
      ...searchFilters,
      [EVENT_SEARCH_FILTERS.IS_FREE]: e.target.checked,
    });
    goToSearch(search);
  };

  const clearInputValues = () => {
    setCategoryInput('');
    setHobbyTypeInput('');
    setPlaceInput('');
    setAutosuggestInput('');
    setMaxAgeInput('');
    setMinAgeInput('');
  };

  const clearFilters = () => {
    const search = getSearchQuery(COURSE_DEFAULT_SEARCH_FILTERS);
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

  const handleSetAgeValues = (minAge: string, maxAge: string) => {
    setMinAgeInput(minAge);
    setMaxAgeInput(maxAge);
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
                    placeholder={tAppHobbies(
                      'appHobbies:search.search.placeholder'
                    )}
                    searchValue={autosuggestInput}
                  />
                </div>
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
              </div>
            </div>
            <div className={styles.rowWrapper}>
              <div className={styles.row}>
                <div>
                  <MultiSelectDropdown
                    checkboxName="hobbyTypeOptions"
                    icon={<IconGroup aria-hidden />}
                    inputValue={hobbyTypeInput}
                    name="hobbyType"
                    onChange={setSelectedHobbyTypes}
                    options={hobbyTypes}
                    setInputValue={setHobbyTypeInput}
                    showSearch={false}
                    title={t('search.titleDropdownHobbyType')}
                    value={selectedHobbyTypes}
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
                <div>
                  <RangeDropdown
                    icon={<IconCake aria-hidden />}
                    rangeIcon={<IconMinus aria-hidden />}
                    minInputValue={minAgeInput}
                    minInputStartValue={MIN_AGE.toString()}
                    minInputFixedValue={'18'}
                    maxInputValue={maxAgeInput}
                    maxInputEndValue={MAX_AGE.toString()}
                    name="ageLimitValues"
                    onChange={handleSetAgeValues}
                    fixedValuesText={t('search.showOnlyAdultCourses')}
                    title={t('search.ageLimitValues')}
                    header={t('search.ageLimitHeader')}
                    value={[minAgeInput, maxAgeInput]}
                    withPlaceholders={false}
                  />
                </div>
              </div>
            </div>
            <div className={styles.rowWrapper}>
              <div className={styles.row}>
                {/* <div>
                  <Checkbox
                    className={styles.checkbox}
                    checked={onlyChildrenEvents}
                    id={EVENT_SEARCH_FILTERS.ONLY_CHILDREN_EVENTS}
                    label={t("search.checkboxOnlyChildrenEvents")}
                    onChange={handleOnlyChildrenEventChange}
                  />
                </div> */}
                <div>
                  <Checkbox
                    className={styles.checkbox}
                    checked={searchFilters.isFree}
                    id={EVENT_SEARCH_FILTERS.IS_FREE}
                    label={t('search.checkboxIsFree')}
                    onChange={handleIsFreeChange}
                  />
                </div>
                <div className={styles.buttonWrapper}>
                  <Button
                    theme="coat"
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
