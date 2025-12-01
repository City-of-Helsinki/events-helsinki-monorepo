import {
  AdvancedSearchNumberInput,
  AdvancedSearchTextInput,
  Checkbox,
  DateSelector,
  EVENT_SEARCH_FILTERS,
  IconRead,
  PlaceSelector,
  useAppHobbiesTranslation,
} from '@events-helsinki/components';
import classNames from 'classnames';
import {
  Button,
  IconCake,
  IconSearch,
  IconLocation,
  Select,
  ButtonPresetTheme,
} from 'hds-react';
import type { Option } from 'hds-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import queryString from 'query-string';
import type { FormEvent } from 'react';
import React from 'react';
import { COURSE_DEFAULT_SEARCH_FILTERS } from '../constants';
import FilterSummary from '../filterSummary/FilterSummary';
import {
  clampAgeInput,
  getEventCategoryOptions,
  getSearchFilters,
  getSearchQuery,
  MAX_AGE,
  MIN_AGE,
} from '../utils';
import { useAdvancedSearchContext } from './AdvancedSearchContext';
import styles from './search.module.scss';
import { useGoToSearch } from './useGoToSearch';

type AdvancedSearchFormProps = {
  title?: string;
  description?: string;
};

/**
 * AdvancedSearchForm is a child component that consumes the AdvancedSearchContext
 * to access and display the search form elements.
 */
export const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = ({
  title = 'search:search.titlePage',
  description = 'search:search.descriptionPage',
}) => {
  const { t } = useTranslation('search');
  const { t: tAppHobbies } = useAppHobbiesTranslation();
  const router = useRouter();
  const searchParams = React.useMemo(
    () => new URLSearchParams(queryString.stringify(router.query)),
    [router.query]
  );

  const {
    ageInput,
    setAgeInput,
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
    sortOrder,
  } = useAdvancedSearchContext();

  const searchFilters = {
    ...getSearchFilters(searchParams),
    [EVENT_SEARCH_FILTERS.CATEGORIES]: selectedCategories,
    [EVENT_SEARCH_FILTERS.DATE_TYPES]: selectedDateTypes,
    [EVENT_SEARCH_FILTERS.END]: end,
    [EVENT_SEARCH_FILTERS.PLACES]: selectedPlaces,
    [EVENT_SEARCH_FILTERS.START]: start,
    [EVENT_SEARCH_FILTERS.TEXT]: selectedTexts,
    [EVENT_SEARCH_FILTERS.SUITABLE]: ageInput,
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
      sort: sortOrder ?? undefined,
    };
    const search = getSearchQuery(filters);

    goToSearch(search);
  };

  const handleCategoryChange = (selectedOptions: Option[]) => {
    const optionValues = selectedOptions.map((option) => option.value);
    setSelectedCategories(optionValues);
  };

  const clearInputValues = () => {
    setPlaceInput('');
    setTextSearchInput('');
    setAgeInput(undefined);
  };

  const clearFilters = () => {
    const search = getSearchQuery(COURSE_DEFAULT_SEARCH_FILTERS);
    clearInputValues();
    goToSearch(search);
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
            {tAppHobbies(title)}
          </h1>
        )}
        {description && (
          <p className={styles.searchDescription}>{tAppHobbies(description)}</p>
        )}
        <div className={styles.rowWrapper}>
          <div className={classNames(styles.row, styles.textSearchRow)}>
            <AdvancedSearchTextInput
              className={styles.searchInputWrapper}
              id="search"
              name="search"
              placeholder={tAppHobbies('appHobbies:search.search.placeholder')}
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
            <div>
              <AdvancedSearchNumberInput
                className={styles.ageSelector}
                id="age"
                icon={<IconCake aria-hidden />}
                min={MIN_AGE}
                max={MAX_AGE}
                name="age"
                onChange={(event) =>
                  setAgeInput(clampAgeInput(event.target.value))
                }
                aria-label={t('search.ariaLabelAge')}
                label={
                  '' /* Required by HDS NumberInput but current UI design uses icons. */
                }
                placeholder={t('search.placeholderAge')}
                value={ageInput ?? ''}
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
                theme={ButtonPresetTheme.Coat}
                fullWidth={true}
                iconStart={<IconSearch aria-hidden />}
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
