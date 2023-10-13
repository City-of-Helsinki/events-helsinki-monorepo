import { useSearchTranslation } from '@events-helsinki/components';
import React from 'react';
import {
  getTargetGroupOptions,
  getSportsCategoryOptions,
  sortExtendedCategoryOptions,
} from '../../eventSearch/utils';
import { useCombinedSearchContext } from '../adapters/CombinedSearchContext';

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
  const targetGroups = getTargetGroupOptions(t);

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
