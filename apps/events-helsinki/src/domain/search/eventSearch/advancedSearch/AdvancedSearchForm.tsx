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

import SearchAutosuggest from '../../../../common-events/components/search/SearchAutosuggest';
import { ROUTES } from '../../../../constants';
import routerHelper from '../../../app/routerHelper';
import PlaceSelector from '../../../place/placeSelector/PlaceSelector';
import { EVENT_DEFAULT_SEARCH_FILTERS } from '../constants';
import FilterSummary from '../filterSummary/FilterSummary';
import {
  getEventCategoryOptions,
  getSearchFilters,
  getSearchQuery,
  sortExtendedCategoryOptions,
} from '../utils';
import { useAdvancedSearchContext } from './AdvancedSearchContext';
import styles from './search.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AdvancedSearchFormProps {}

export const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = () => {
  const { t } = useTranslation('search');
  const { t: tAppEvents } = useAppEventsTranslation();
  const router = useRouter();

  const locale = useLocale();
  const searchParams = React.useMemo(
    () => new URLSearchParams(queryString.stringify(router.query)),
    [router.query]
  );

  const {
    categoryInput,
    setCategoryInput,
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
                placeholder={tAppEvents('appEvents:search.search.placeholder')}
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
                checked={searchFilters.isFree}
                id={EVENT_SEARCH_FILTERS.IS_FREE}
                label={t('search.checkboxIsFree')}
                onChange={handleIsFreeChange}
              />
            </div>
            <div>
              <Checkbox
                className={styles.checkbox}
                checked={searchFilters.onlyEveningEvents}
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
                checked={searchFilters.onlyChildrenEvents}
                id={EVENT_SEARCH_FILTERS.ONLY_CHILDREN_EVENTS}
                label={t('search.checkboxOnlyChildrenEvents')}
                onChange={handleOnlyChildrenEventChange}
              />
            </div>
            <div>
              <Checkbox
                className={styles.checkbox}
                checked={searchFilters.onlyRemoteEvents}
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
  );
};

export default AdvancedSearchForm;
