import {
  Checkbox,
  DateSelector,
  useAppEventsTranslation,
  IconRead,
  EVENT_SEARCH_FILTERS,
  AdvancedSearchTextInput,
  PlaceSelector,
  useSearchTranslation,
} from '@events-helsinki/components';
import classNames from 'classnames';
import type { Option } from 'hds-react';
import {
  Button,
  IconSearch,
  IconLocation,
  ButtonVariant,
  Select,
} from 'hds-react';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import type { FormEvent } from 'react';
import React from 'react';

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

type AdvancedSearchFormProps = {
  title?: string;
  description?: string;
};

export const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = ({
  title = 'search:search.titlePage',
  description = 'search:search.descriptionPage',
}) => {
  const { t } = useSearchTranslation();
  const { t: tAppEvents } = useAppEventsTranslation();
  const router = useRouter();

  const searchParams = React.useMemo(
    () => new URLSearchParams(queryString.stringify(router.query)),
    [router.query]
  );

  const {
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
    sortOrder,
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
      sort: sortOrder ?? undefined,
    };
    const search = getSearchQuery(filters);

    goToSearch(search);
  };

  const handleCategoryChange = (selectedOptions: Option[]) => {
    const optionValues = selectedOptions.map((option) => option.value);
    setSelectedCategories(optionValues);
  };

  const handleTargetAgeGroupChange = (
    _options: TargetAgeGroupOptionType[],
    option: TargetAgeGroupOptionType | null
  ) => {
    setSelectedTargetAgeGroup(option?.value ?? '');
  };

  const clearInputValues = () => {
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
        {title && (
          <h1
            className={classNames(styles.searchTitle, {
              [styles.withDescription]: !!description,
            })}
          >
            {tAppEvents(title)}
          </h1>
        )}
        {description && (
          <p className={styles.searchDescription}>{tAppEvents(description)}</p>
        )}
        <div className={styles.rowWrapper}>
          <div className={classNames(styles.row, styles.textSearchRow)}>
            <AdvancedSearchTextInput
              className={styles.searchInputWrapper}
              id="search"
              name="search"
              placeholder={tAppEvents('appEvents:search.search.placeholder')}
              value={textSearchInput}
              onChange={(event) => setTextSearchInput(event.target.value)}
              clearButton={false} // HH-456 the clear button not working properly when value handled programmatically.
            />
          </div>
        </div>
        <div className={styles.rowWrapper}>
          <div className={styles.row}>
            <div>
              <Select
                id="categories"
                className={styles.categoriesSelector}
                multiSelect
                texts={{ placeholder: t('search.titleDropdownCategory') }}
                options={categories.map((option) => ({
                  ...option,
                  label: option.text,
                }))}
                onChange={handleCategoryChange}
                value={selectedCategories}
                icon={<IconRead aria-hidden />}
                noTags
                // Show next option partially to indicate more is available.
                // See more: (https://hds.hel.fi/components/select/code/#component-properties)
                visibleOptions={5.97}
                theme={{
                  '--checkbox-background-selected': 'var(--color-input-dark)',
                  '--checkbox-background-hover': 'var(--color-input-dark)',
                  '--menu-item-background-color-hover':
                    'var(--color-input-light)',
                  '--menu-item-background-color-selected-hover':
                    'var(--color-input-light)',
                }}
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
                theme={{
                  '--menu-item-background-color-hover':
                    'var(--color-input-light)',
                  '--menu-item-background-color-selected':
                    'var(--color-input-dark)',
                  '--menu-item-background-color-selected-hover':
                    'var(--color-input-dark)',
                  '--menu-item-color-selected-hover': 'var(--color-white)',
                }}
              />
            </div>
            <div>
              <PlaceSelector
                className={styles.placeSelector}
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
            <div className={styles.checkboxWrapper}>
              <Checkbox
                className={styles.checkbox}
                checked={isFree}
                id={EVENT_SEARCH_FILTERS.IS_FREE}
                label={t('search.checkboxIsFree')}
                onChange={(e) => setIsFree(e.target.checked)}
              />
            </div>
            <div className={styles.checkboxWrapper}>
              <Checkbox
                className={styles.checkbox}
                checked={isOnlyEveningEvents}
                id={EVENT_SEARCH_FILTERS.ONLY_EVENING_EVENTS}
                label={t('search.checkboxOnlyEveningEvents')}
                onChange={(e) => setIsOnlyEveningEvents(e.target.checked)}
              />
            </div>
            <div className={styles.checkboxWrapper}>
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
                iconStart={<IconSearch aria-hidden />}
                type="submit"
                variant={ButtonVariant.Success}
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
