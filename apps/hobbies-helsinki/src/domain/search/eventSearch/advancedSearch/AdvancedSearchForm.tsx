import {
  AdvancedSearchTextInput,
  Checkbox,
  DateSelector,
  EVENT_SEARCH_FILTERS,
  IconRead,
  MultiSelectDropdown,
  RangeDropdown,
  useAppHobbiesTranslation,
} from '@events-helsinki/components';
import classNames from 'classnames';
import {
  Button,
  IconCake,
  IconSearch,
  IconLocation,
  IconMinus,
} from 'hds-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import queryString from 'query-string';
import type { FormEvent } from 'react';
import React from 'react';
import PlaceSelector from '../../../place/placeSelector/PlaceSelector';
import { COURSE_DEFAULT_SEARCH_FILTERS } from '../constants';
import FilterSummary from '../filterSummary/FilterSummary';
import {
  getEventCategoryOptions,
  getSearchFilters,
  getSearchQuery,
  MAX_AGE,
  MIN_AGE,
} from '../utils';
import { useAdvancedSearchContext } from './AdvancedSearchContext';
import styles from './search.module.scss';
import { useGoToSearch } from './useGoToSearch';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AdvancedSearchFormProps {}

/**
 * AdvancedSearchForm is a child component that consumes the AdvancedSearchContext
 * to access and display the search form elements.
 */
export const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = () => {
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
    textSearchInput,
    setTextSearchInput,
    isFree,
    setIsFree,
    scrollToResultList,
  } = useAdvancedSearchContext();

  const searchFilters = {
    ...getSearchFilters(searchParams),
    [EVENT_SEARCH_FILTERS.CATEGORIES]: selectedCategories,
    [EVENT_SEARCH_FILTERS.DATE_TYPES]: selectedDateTypes,
    [EVENT_SEARCH_FILTERS.END]: end,
    [EVENT_SEARCH_FILTERS.PLACES]: selectedPlaces,
    [EVENT_SEARCH_FILTERS.START]: start,
    [EVENT_SEARCH_FILTERS.TEXT]: selectedTexts,
    [EVENT_SEARCH_FILTERS.MIN_AGE]: minAgeInput,
    [EVENT_SEARCH_FILTERS.MAX_AGE]: maxAgeInput,
    [EVENT_SEARCH_FILTERS.IS_FREE]: isFree,
  };

  const categories = React.useMemo(() => getEventCategoryOptions(t), [t]);

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
      [EVENT_SEARCH_FILTERS.TEXT]: [textSearchInput],
    };
    const search = getSearchQuery(filters);

    goToSearch(search);
  };

  const clearInputValues = () => {
    setCategoryInput('');
    setPlaceInput('');
    setTextSearchInput('');
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
    setTextSearchInput('');
    scrollToResultList();
  };

  const handleSetAgeValues = (minAge: string, maxAge: string) => {
    setMinAgeInput(minAge);
    setMaxAgeInput(maxAge);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.searchWrapper}>
        <h1>{t('search.labelSearchField')}</h1>
        <div className={styles.rowWrapper}>
          <div className={classNames(styles.row, styles.textSearchRow)}>
            <AdvancedSearchTextInput
              id="search"
              name="search"
              placeholder={tAppHobbies('appHobbies:search.search.placeholder')}
              value={textSearchInput}
              onChange={(event) => setTextSearchInput(event.target.value)}
              clearButton
              clearButtonAriaLabel={tAppHobbies(
                'appHobbies:search.search.clearButtonAriaLabel'
              )}
            />
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
                checked={searchFilters.isFree}
                id={EVENT_SEARCH_FILTERS.IS_FREE}
                label={t('search.checkboxIsFree')}
                onChange={(e) => setIsFree(e.target.checked)}
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
  );
};
