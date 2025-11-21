import {
  useSearchTranslation,
  useAppSportsTranslation,
  IconPersonRunning,
  AdvancedSearchTextInput,
} from '@events-helsinki/components';
import classNames from 'classnames';
import type { Option } from 'hds-react';
import {
  Button,
  ButtonVariant,
  IconGroup,
  IconPersonWheelchair,
  IconSearch,
  Select,
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
    sportsCategories,
    selectedTargetGroups,
    setSelectedTargetGroups,
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
          <div className={classNames(styles.textSearchRow)}>
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
              className={classNames(
                AppConfig.showTargetGroupFilter
                  ? styles.rowWithTargetGroupFilter
                  : styles.rowWithoutTargetGroupFilter
              )}
            >
              <div>
                <Select
                  className={styles.categoriesSelector}
                  id="sportsCategory"
                  icon={<IconPersonRunning aria-hidden />}
                  onChange={(selectedOptions: Option[]) =>
                    setSelectedSportsCategories(
                      selectedOptions.map((option) => option.value)
                    )
                  }
                  options={sportsCategories}
                  // Show next option partially to indicate more is available.
                  // See more: (https://hds.hel.fi/components/select/code/#component-properties)
                  visibleOptions={5.97}
                  texts={{
                    placeholder: t('search.titleDropdownSportsCategory'),
                  }}
                  value={selectedSportsCategories}
                  theme={{
                    '--checkbox-background-selected': 'var(--color-input-dark)',
                    '--checkbox-background-hover': 'var(--color-input-dark)',
                    '--menu-item-background-color-hover':
                      'var(--color-input-light)',
                    '--menu-item-background-color-selected-hover':
                      'var(--color-input-light)',
                  }}
                  multiSelect
                  noTags
                />
              </div>
              {AppConfig.showTargetGroupFilter && (
                <div>
                  <Select
                    className={styles.targetGroupSelector}
                    icon={<IconGroup aria-hidden />}
                    id="targetGroup"
                    options={targetGroups}
                    // Show next option partially to indicate more is available.
                    // See more: (https://hds.hel.fi/components/select/code/#component-properties)
                    visibleOptions={5.97}
                    texts={{
                      placeholder: t('search.titleDropdownTargetGroup'),
                    }}
                    value={selectedTargetGroups}
                    onChange={(selectedOptions: Option[]) =>
                      setSelectedTargetGroups(
                        selectedOptions.map((option) => option.value)
                      )
                    }
                    theme={{
                      '--checkbox-background-selected':
                        'var(--color-input-dark)',
                      '--checkbox-background-hover': 'var(--color-input-dark)',
                      '--menu-item-background-color-hover':
                        'var(--color-input-light)',
                      '--menu-item-background-color-selected-hover':
                        'var(--color-input-light)',
                    }}
                    multiSelect
                    noTags
                  />
                </div>
              )}
              <div>
                <Select
                  id="accessibilityProfile"
                  className={styles.accessibilityProfileSelector}
                  texts={{
                    placeholder: t('search:search.labelAccessibilityProfile'),
                    clearButtonAriaLabel_one: t(
                      'search:search.ariaLabelClearAccessibilityProfile'
                    ),
                  }}
                  options={accessibilityProfiles}
                  // Show next option partially to indicate more is available.
                  // See more: (https://hds.hel.fi/components/select/code/#component-properties)
                  visibleOptions={5.97}
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
                  multiSelect={false}
                  noTags
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
