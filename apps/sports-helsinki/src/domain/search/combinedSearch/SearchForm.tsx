import type { AutosuggestMenuOption } from '@events-helsinki/components';
import {
  useSearchTranslation,
  MultiSelectDropdown,
  useAppSportsTranslation,
  IconPersonRunning,
  SearchSelect,
} from '@events-helsinki/components';
import type { SelectCustomTheme } from 'hds-react';
import { Button, IconGroup, IconPersonWheelchair, IconSearch } from 'hds-react';
import React from 'react';
import SearchAutosuggest from '../../../common-events/components/search/SearchAutosuggest';
import AppConfig from '../../app/AppConfig';
import { useCombinedSearchContext } from '../combinedSearch/adapters/CombinedSearchContext';
import type { SearchComponentType } from '../combinedSearch/types';
import FilterSummary from '../eventSearch/filterSummary/FilterSummary';
import { useFormValues } from './hooks/useFormValues';
import styles from './search.module.scss';

export const SimpleSearchForm: React.FC<SearchComponentType> = ({
  scrollToResultList,
  showTitle = false,
}) => {
  const { t } = useSearchTranslation();
  const { t: tAppSports } = useAppSportsTranslation();

  const { resetFormValues, setFormValues, updateRouteToSearchPage } =
    useCombinedSearchContext();

  const {
    autosuggestInput,
    setAutosuggestInput,
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

  const accessibilityProfileValue =
    accessibilityProfiles.find(
      (option) => option.value === selectedAccessibilityProfile
    ) ?? accessibilityProfiles[0]; // Select the first -- an empty option -- if no value.

  const handleSubmit = (formEvent?: React.FormEvent) => {
    // The default submit event must be prevented so the page does not reload
    formEvent?.preventDefault();
    // Set the new form values to the context
    setFormValues({
      text: autosuggestInput,
      sportsCategories: selectedSportsCategories,
      targetGroups: selectedTargetGroups,
      accessibilityProfile: selectedAccessibilityProfile,
    });
    // Update the browser URL with the form values in the context.
    updateRouteToSearchPage({ shallow: true });
    // Scroll to result list.
    scrollToResultList && scrollToResultList();
  };

  const handleMenuOptionClick = (option: AutosuggestMenuOption) => {
    const value = option.text;
    setAutosuggestInput(value);
    handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.searchWrapper}>
        {showTitle && (
          <h1 className={styles.searchTitle}>{t('search.labelSearchField')}</h1>
        )}
        <div className={styles.rowWrapper}>
          <div>
            <SearchAutosuggest
              name="text"
              onChangeSearchValue={setAutosuggestInput}
              onOptionClick={handleMenuOptionClick}
              placeholder={tAppSports('appSports:search.search.placeholder')}
              searchValue={autosuggestInput}
            />
          </div>
          <div className={styles.rowWrapper}>
            <div className={styles.row}>
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
                  label={t('search:search.labelAccessibilityProfile')}
                  placeholder={t('search:search.labelAccessibilityProfile')}
                  clearButtonAriaLabel={t(
                    'search:search.ariaLabelClearAccessibilityProfile'
                  )}
                  options={accessibilityProfiles}
                  value={accessibilityProfileValue}
                  onChange={(option) =>
                    setSelectedAccessibilityProfile(option?.value)
                  }
                  icon={<IconPersonWheelchair aria-hidden />}
                  theme={
                    {
                      '--menu-item-background': 'var(--color-input-dark)',
                      '--menu-item-background-hover': 'var(--color-input-dark)',
                      '--menu-item-background-selected-hover':
                        'var(--color-input-dark)',
                    } as SelectCustomTheme
                  }
                  noOutline
                  // FIXME: Using the clearable could be a better solution than offering an empty option,
                  // but the HDS has a bug or unfinished feature in the clearable
                  // and the controlled state of the input value, does not work when it's used.
                  // A following error could be thrown:
                  // "downshift: A component has changed the uncontrolled prop "selectedItem" to be controlled.
                  // This prop should not switch from controlled to uncontrolled (or vice versa).
                  // Decide between using a controlled or uncontrolled Downshift element for the lifetime of the component.
                  // More info: https://github.com/downshift-js/downshift#control-props".
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
        </div>
        <FilterSummary onClear={resetFormValues} />
      </div>
    </form>
  );
};
