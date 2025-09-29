import {
  Checkbox,
  DateSelector,
  MultiSelectDropdown,
  useAppEventsTranslation,
  IconRead,
  EVENT_SEARCH_FILTERS,
  AdvancedSearchTextInput,
} from '@events-helsinki/components';
import classNames from 'classnames';
import type { SelectCustomTheme } from 'hds-react';
import { Button, IconSearch, IconLocation } from 'hds-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import queryString from 'query-string';
import type { FormEvent } from 'react';
import React from 'react';

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
import type { TargetAgeGroupOptionType } from './TargetAgeGroupSelector';
import TargetAgeGroupSelector from './TargetAgeGroupSelector';
import { useGoToSearch } from './useGoToSearch';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AdvancedSearchFormProps {}

export const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = () => {
  const { t } = useTranslation('search');
  const { t: tAppEvents } = useAppEventsTranslation();
  const router = useRouter();

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
    selectedTargetAgeGroup,
    setSelectedTargetAgeGroup,
    selectedPlaces,
    setSelectedPlaces,
    start,
    setStart,
    end,
    setEnd,
    isCustomDate,
    setIsCustomDate,
    textSearchInput,
    setTextSearchInput,
    isOnlyEveningEvents,
    setIsOnlyEveningEvents,
    isOnlyRemoteEvents,
    setIsOnlyRemoteEvents,
    isFree,
    setIsFree,
    scrollToResultList,
  } = useAdvancedSearchContext();

  const searchFilters = {
    ...getSearchFilters(searchParams),
    [EVENT_SEARCH_FILTERS.CATEGORIES]: selectedCategories,
    [EVENT_SEARCH_FILTERS.TARGET_AGE_GROUP]: selectedTargetAgeGroup,
    [EVENT_SEARCH_FILTERS.DATE_TYPES]: selectedDateTypes,
    [EVENT_SEARCH_FILTERS.END]: end,
    [EVENT_SEARCH_FILTERS.PLACES]: selectedPlaces,
    [EVENT_SEARCH_FILTERS.START]: start,
    [EVENT_SEARCH_FILTERS.TEXT]: textSearchInput ? [textSearchInput] : [],
    [EVENT_SEARCH_FILTERS.ONLY_EVENING_EVENTS]: isOnlyEveningEvents,
    [EVENT_SEARCH_FILTERS.ONLY_REMOTE_EVENTS]: isOnlyRemoteEvents,
    [EVENT_SEARCH_FILTERS.IS_FREE]: isFree,
  };

  const categories = getEventCategoryOptions(t).sort(
    sortExtendedCategoryOptions
  );

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

  const handleTargetAgeGroupChange = (
    option: TargetAgeGroupOptionType | null
  ) => {
    setSelectedTargetAgeGroup(option?.value ?? '');
  };

  const clearInputValues = () => {
    setCategoryInput('');
    setPlaceInput('');
    setTextSearchInput('');
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
    setTextSearchInput('');
    scrollToResultList();
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
              placeholder={tAppEvents('appEvents:search.search.placeholder')}
              value={textSearchInput}
              onChange={(event) => setTextSearchInput(event.target.value)}
              clearButton
              clearButtonAriaLabel={tAppEvents(
                'appEvents:search.search.clearButtonAriaLabel'
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
                buttonStyles={{ fontSize: 'var(--fontsize-body-m)' }}
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
              <TargetAgeGroupSelector
                className={styles.targetAgeGroupSelector}
                id="targetAgeGroup"
                onChange={handleTargetAgeGroupChange}
                value={selectedTargetAgeGroup}
                theme={
                  {
                    '--menu-item-background': 'var(--color-input-dark)',
                    '--menu-item-background-hover': 'var(--color-input-dark)',
                    '--menu-item-background-selected-hover':
                      'var(--color-input-dark)',
                  } as SelectCustomTheme
                }
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
                buttonStyles={{ fontSize: 'var(--fontsize-body-m)' }}
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
                onChange={(e) => setIsFree(e.target.checked)}
              />
            </div>
            <div>
              <Checkbox
                className={styles.checkbox}
                checked={isOnlyEveningEvents}
                id={EVENT_SEARCH_FILTERS.ONLY_EVENING_EVENTS}
                label={t('search.checkboxOnlyEveningEvents')}
                onChange={(e) => setIsOnlyEveningEvents(e.target.checked)}
              />
            </div>
            <div>
              <Checkbox
                className={styles.checkbox}
                checked={isOnlyRemoteEvents}
                id={EVENT_SEARCH_FILTERS.ONLY_REMOTE_EVENTS}
                label={t('search.checkboxOnlyRemoteEvents')}
                onChange={(e) => setIsOnlyRemoteEvents(e.target.checked)}
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
