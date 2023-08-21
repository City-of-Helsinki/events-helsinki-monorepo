import type { AutosuggestMenuOption } from '@events-helsinki/components';
import {
  useSearchTranslation,
  MultiSelectDropdown,
  useAppSportsTranslation,
  IconPersonRunning,
} from '@events-helsinki/components';
import classNames from 'classnames';
import { Button, IconGroup, IconSearch } from 'hds-react';
import React from 'react';
import SearchAutosuggest from '../../../common-events/components/search/SearchAutosuggest';
import AppConfig from '../../app/AppConfig';
import { useCombinedSearchContext } from '../combinedSearch/adapters/CombinedSearchContext';
import type { SearchComponentType } from '../combinedSearch/types';
import FilterSummary from '../eventSearch/filterSummary/FilterSummary';
import {
  getTargetGroupOptions,
  getSportsCategoryOptions,
  sortExtendedCategoryOptions,
} from '../eventSearch/utils';
import styles from './search.module.scss';

export function useFormValues() {
  const { t } = useSearchTranslation();
  const { formValues } = useCombinedSearchContext();
  const [autosuggestInput, setAutosuggestInput] = React.useState(
    formValues.text ?? ''
  );
  const [selectedSportsCategories, setSelectedSportsCategories] =
    React.useState<string[]>(formValues.sportsCategories);
  const [sportsCategoryInput, setSportsCategoryInput] = React.useState('');
  const sportsCategories = getSportsCategoryOptions(t).sort(
    sortExtendedCategoryOptions
  );
  const [selectedTargetGroups, setSelectedTargetGroups] = React.useState<
    string[]
  >(formValues.targetGroups);
  const [targetGroupInput, setTargetGroupInput] = React.useState('');
  const targetGroups = getTargetGroupOptions(t).sort(
    sortExtendedCategoryOptions
  );

  // On page load, initialize the form with values
  // that are available only after the page has fully loaded
  React.useEffect(() => {
    setAutosuggestInput(formValues.text ?? '');
    setSelectedSportsCategories(formValues.sportsCategories);
    setSelectedTargetGroups(formValues.targetGroups);
  }, [formValues.sportsCategories, formValues.targetGroups, formValues.text]);

  return {
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
  };
}

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
  } = useFormValues();

  const handleSubmit = (formEvent?: React.FormEvent) => {
    // The default submit event must be prevented so the page does not reload
    formEvent?.preventDefault();
    // Set the new form values to the context
    setFormValues({
      text: autosuggestInput,
      sportsCategories: selectedSportsCategories,
      targetGroups: selectedTargetGroups,
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
          <div
            className={classNames(
              styles.row,
              AppConfig.showTargetGroupFilter
                ? styles.autoSuggestRowWithTargetGroupFilter
                : styles.autoSuggestRowWithoutTargetGroupFilter
            )}
          >
            <div>
              <SearchAutosuggest
                name="text"
                onChangeSearchValue={setAutosuggestInput}
                onOptionClick={handleMenuOptionClick}
                placeholder={tAppSports('appSports:search.search.placeholder')}
                searchValue={autosuggestInput}
              />
            </div>
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
          </div>
          <div className={styles.rowWrapper}>
            <div className={styles.row}>
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
