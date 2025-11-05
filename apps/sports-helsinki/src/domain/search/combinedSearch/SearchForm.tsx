import {
  useSearchTranslation,
  MultiSelectDropdown,
  useAppSportsTranslation,
  IconPersonRunning,
  SearchSelect,
  AdvancedSearchTextInput,
} from '@events-helsinki/components';
import classNames from 'classnames';
import type { SelectCustomTheme, Option } from 'hds-react';
import {
  Button,
  ButtonVariant,
  IconGroup,
  IconPersonWheelchair,
  IconSearch,
} from 'hds-react';
import React from 'react';
import AppConfig from '../../app/AppConfig';
import { useCombinedSearchContext } from '../combinedSearch/adapters/CombinedSearchContext';
import type { SearchComponentType } from '../combinedSearch/types';
import FilterSummary from '../eventSearch/filterSummary/FilterSummary';
import { useFormValues } from './hooks/useFormValues';
import styles from './search.module.scss';

export const SimpleSearchForm: React.FC<SearchComponentType> = ({
  scrollToResultList,
  title = undefined,
  description = undefined,
}) => {
  const { t } = useSearchTranslation();
  const { t: tAppSports } = useAppSportsTranslation();

  const {
    resetFormValues,
    setFormValues,
    setFormValue,
    updateRouteToSearchPage,
  } = useCombinedSearchContext();

  const {
    textSearchInput,
    setTextSearchInput,
    selectedSportsCategories,
    setSelectedSportsCategories,
    sportsCategoryInput,
    setSportsCategoryInput,
    sportsCategories,
    selectedTargetGroups,
    setSelectedTargetGroups,
    targetGroupInput,
    setTargetGroupInput,
    targetGroups,
    accessibilityProfiles,
    selectedAccessibilityProfile,
    setSelectedAccessibilityProfile,
  } = useFormValues();

  const handleSubmit = (formEvent?: React.FormEvent) => {
    // The default submit event must be prevented so the page does not reload
    formEvent?.preventDefault();
    // Set the new form values to the context
    setFormValues({
      text: textSearchInput,
      sportsCategories: selectedSportsCategories,
      targetGroups: selectedTargetGroups,
      accessibilityProfile: selectedAccessibilityProfile,
    });
    // Update the browser URL with the form values in the context.
    updateRouteToSearchPage({ shallow: true });
    // Scroll to result list.
    if (scrollToResultList) {
      scrollToResultList();
    }
  };

  const handleAccessibilityProfileOnChange = (
    _selectedOptions: Option[],
    option: Option
  ) => {
    setSelectedAccessibilityProfile(option?.value);
    if (option?.value) {
      setFormValue('venueOrderBy', option.value);
    }
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
            {title}
          </h1>
        )}
        {description && (
          <p className={styles.searchDescription}>{description}</p>
        )}
        <div className={styles.rowWrapper}>
          <div>
            <AdvancedSearchTextInput
              id="search"
              name="search"
              placeholder={tAppSports('appSports:search.search.placeholder')}
              value={textSearchInput}
              onChange={(event) => setTextSearchInput(event.target.value)}
              clearButton
              clearButtonAriaLabel={tAppSports(
                'appSports:search.search.clearButtonAriaLabel'
              )}
            />
          </div>
          <div className={styles.rowWrapper}>
            <div
              className={
                AppConfig.showTargetGroupFilter
                  ? styles.rowWithTargetGroupFilter
                  : styles.rowWithoutTargetGroupFilter
              }
            >
              <div>
                <MultiSelectDropdown
                  checkboxName="sportsCategoryOptions"
                  icon={<IconPersonRunning aria-hidden />}
                  inputValue={sportsCategoryInput}
                  name="sportsCategory"
                  onChange={setSelectedSportsCategories}
                  options={sportsCategories}
                  setInputValue={setSportsCategoryInput}
                  showSearch={false}
                  title={t('search.titleDropdownSportsCategory')}
                  value={selectedSportsCategories}
                />
              </div>
              {AppConfig.showTargetGroupFilter && (
                <div>
                  <MultiSelectDropdown
                    checkboxName="targetGroupOptions"
                    icon={<IconGroup aria-hidden />}
                    inputValue={targetGroupInput}
                    name="targetGroup"
                    onChange={setSelectedTargetGroups}
                    options={targetGroups}
                    setInputValue={setTargetGroupInput}
                    showSearch={false}
                    title={t('search.titleDropdownTargetGroup')}
                    value={selectedTargetGroups}
                  />
                </div>
              )}
              <div>
                <SearchSelect
                  id="accessibilityProfile"
                  texts={{
                    label: t('search:search.labelAccessibilityProfile'),
                    placeholder: t('search:search.labelAccessibilityProfile'),
                    clearButtonAriaLabel_one: t(
                      'search:search.ariaLabelClearAccessibilityProfile'
                    ),
                  }}
                  options={accessibilityProfiles}
                  value={selectedAccessibilityProfile ?? undefined}
                  onChange={handleAccessibilityProfileOnChange}
                  icon={<IconPersonWheelchair aria-hidden />}
                  theme={{
                    '--menu-item-background-color-hover':
                      'var(--color-input-light)',
                    '--menu-item-background-color-selected':
                      'var(--color-input-dark)',
                    '--menu-item-background-color-selected-hover':
                      'var(--color-input-dark)',
                    '--menu-item-color-selected-hover': 'var(--color-white)',
                  }}
                  // FIXME: how to handle no outline?
                  // noOutline
                  // FIXME: Using the clearable could be a better solution than offering an empty option,
                  // but the HDS has a bug or unfinished feature in the clearable
                  // and the controlled state of the input value, does not work when it's used.
                  // A following error could be thrown:
                  // "downshift: A component has changed the uncontrolled prop "selectedItem" to be controlled.
                  // This prop should not switch from controlled to uncontrolled (or vice versa).
                  // Decide between using a controlled or uncontrolled Downshift element for the lifetime of
                  // the component. More info: https://github.com/downshift-js/downshift#control-props".
                  // clearable
                />
              </div>
              <div
                className={
                  AppConfig.showTargetGroupFilter
                    ? styles.buttonWrapperWithTargetGroupFilter
                    : styles.buttonWrapperWithoutTargetGroupFilter
                }
              >
                <Button
                  variant={ButtonVariant.Success}
                  fullWidth={true}
                  iconStart={<IconSearch aria-hidden />}
                  type="submit"
                >
                  {t('search.buttonSearch')}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <FilterSummary onClear={resetFormValues} />
      </div>
    </form>
  );
};
