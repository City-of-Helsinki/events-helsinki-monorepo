import type { AutosuggestMenuOption } from '@events-helsinki/components';
import {
  useSearchTranslation,
  useCommonTranslation,
  MultiSelectDropdown,
  useAppSportsTranslation,
} from '@events-helsinki/components';
import classNames from 'classnames';
import { Button, IconSearch } from 'hds-react';
import React from 'react';
import IconPersonRunning from '../../../assets/icons/IconPersonRunning';
import SearchAutosuggest from '../../../common-events/components/search/SearchAutosuggest';
import { useCombinedSearchContext } from '../combinedSearch/adapters/CombinedSearchContext';
import type { SearchComponentType } from '../combinedSearch/types';
import FilterSummary from '../eventSearch/filterSummary/FilterSummary';
import {
  getSportsCategoryOptions,
  sortExtendedCategoryOptions,
} from '../eventSearch/utils';
import styles from './search.module.scss';

export type SearchUtilitiesProps = {
  switchShowMode: () => void;
};

export type SearchComponentProps = {
  'data-testid'?: string;
  korosBottom?: boolean;
  searchUtilities?: React.ReactNode;
  className?: string;
} & SearchComponentType;

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

  // On page load, initialize the form with values
  // that are available only after the page has fully loaded
  React.useEffect(() => {
    setAutosuggestInput(formValues.text ?? '');
    setSelectedSportsCategories(formValues.sportsCategories);
  }, [formValues.sportsCategories, formValues.text]);

  return {
    autosuggestInput,
    setAutosuggestInput,
    selectedSportsCategories,
    setSelectedSportsCategories,
    sportsCategoryInput,
    setSportsCategoryInput,
    sportsCategories,
  };
}

export const SimpleVenueSearchForm: React.FC<SearchComponentType> = ({
  scrollToResultList,
  showTitle = false,
}) => {
  const { t } = useSearchTranslation();
  const { t: tAppSports } = useAppSportsTranslation();

  const { resetFormValues, setFormValues, pushRouterToSyncURL } =
    useCombinedSearchContext();

  const {
    autosuggestInput,
    setAutosuggestInput,
    selectedSportsCategories,
    setSelectedSportsCategories,
    sportsCategoryInput,
    setSportsCategoryInput,
    sportsCategories,
  } = useFormValues();

  const handleSubmit = (formEvent?: React.FormEvent) => {
    // The default submit event must be prevented so the page does not reload
    formEvent?.preventDefault();
    // Set the new form values to the context
    setFormValues({
      text: autosuggestInput,
      sportsCategories: selectedSportsCategories,
    });
    // Update the browser URL with the form values in the context.
    pushRouterToSyncURL();
    // Scroll to result list.
    scrollToResultList && scrollToResultList();
  };

  const handleMenuOptionClick = async (option: AutosuggestMenuOption) => {
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
          <div className={classNames(styles.row, styles.autoSuggestRow)}>
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
          </div>
          <div className={styles.rowWrapper}>
            <div className={styles.row}>
              <div className={styles.buttonWrapper}>
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

export const VenueSearchUtilities: React.FC<SearchUtilitiesProps> = ({
  switchShowMode,
}) => {
  const { t } = useCommonTranslation();
  return (
    <>
      <Button variant="secondary" theme="black" onClick={switchShowMode}>
        {t('common:mapSearch.showOnMap')}
      </Button>
    </>
  );
};

const SimpleVenueSearch: React.FC<SearchComponentProps> = ({
  'data-testid': dataTestId,
  className,
  ...delegatedSimpleVenueSearchFormProps
}) => {
  return <SimpleVenueSearchForm {...delegatedSimpleVenueSearchFormProps} />;
};
export default SimpleVenueSearch;
