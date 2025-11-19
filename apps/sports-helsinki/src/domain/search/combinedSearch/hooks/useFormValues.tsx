import { useSearchTranslation } from '@events-helsinki/components';
import type { Option } from 'hds-react';
import React from 'react';
import {
  getTargetGroupOptions,
  getSportsCategoryOptions,
  sortExtendedCategoryOptions,
  getAccessibilityProfileOptions,
  sortOptionsAlphabetically,
} from '../../eventSearch/utils';
import { useCombinedSearchContext } from '../adapters/CombinedSearchContext';

export const EMPTY_OPTION: Option = {
  label: '',
  value: '',
  selected: false,
  isGroupLabel: false,
  visible: true,
  disabled: false,
};

export function useFormValues() {
  const { t } = useSearchTranslation();
  const { formValues } = useCombinedSearchContext();
  const [textSearchInput, setTextSearchInput] = React.useState(
    formValues.text ?? ''
  );
  const [selectedSportsCategories, setSelectedSportsCategories] =
    React.useState<string[]>(formValues.sportsCategories);
  const [sportsCategoryInput, setSportsCategoryInput] = React.useState('');
  const sportsCategories = getSportsCategoryOptions(t)
    .sort(sortExtendedCategoryOptions)
    .map((option) => ({
      ...option,
      label: option.text,
    }));
  const [selectedTargetGroups, setSelectedTargetGroups] = React.useState<
    string[]
  >(formValues.targetGroups);
  const targetGroups = getTargetGroupOptions(t).map((option) => ({
    ...option,
    label: option.text,
  }));
  const accessibilityProfiles = [
    // Empty option is needed with the HDS-select because of a bug in it.
    // Otherwise a following error is thrown and the value handling does not work properly,
    // especially when clearing the value:
    // "downshift: A component has changed the uncontrolled prop "selectedItem" to be controlled.
    // This prop should not switch from controlled to uncontrolled (or vice versa).
    // Decide between using a controlled or uncontrolled Downshift element for the lifetime of the component.
    // More info: https://github.com/downshift-js/downshift#control-props".
    EMPTY_OPTION,
    ...getAccessibilityProfileOptions(t).sort(sortOptionsAlphabetically),
  ];
  const [selectedAccessibilityProfile, setSelectedAccessibilityProfile] =
    React.useState(formValues.accessibilityProfile);

  // On page load, initialize the form with values
  // that are available only after the page has fully loaded
  React.useEffect(() => {
    setTextSearchInput(formValues.text ?? '');
    setSelectedSportsCategories(formValues.sportsCategories);
    setSelectedTargetGroups(formValues.targetGroups);
    setSelectedAccessibilityProfile(formValues.accessibilityProfile);
  }, [
    formValues.accessibilityProfile,
    formValues.sportsCategories,
    formValues.targetGroups,
    formValues.text,
  ]);

  return {
    textSearchInput,
    setTextSearchInput,
    selectedSportsCategories,
    setSelectedSportsCategories,
    sportsCategoryInput,
    setSportsCategoryInput,
    sportsCategories,
    selectedTargetGroups,
    setSelectedTargetGroups,
    targetGroups,
    accessibilityProfiles,
    selectedAccessibilityProfile,
    setSelectedAccessibilityProfile,
  };
}
