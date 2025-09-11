import { useSearchTranslation } from '@events-helsinki/components';
import type { SingleSelectProps } from 'hds-react';
import { IconGroup, Select } from 'hds-react';
import { TARGET_GROUP_AGE_GROUPS_IN_ORDER } from '../../../../constants';

/**
 * Get select component options for target group age selection.
 * @param addEmptyOption should an empty selection be included. Defaults to `true`.
 * @returns a list of select options
 */
function useTargetAgeGroupSelectorOptions(addEmptyOption = true) {
  const { t: tSearch } = useSearchTranslation();

  const targetGroups = TARGET_GROUP_AGE_GROUPS_IN_ORDER.map((ageGroup) => ({
    label: tSearch(`search.targetAgeGroup.${ageGroup}`),
    value: ageGroup,
  }));

  if (addEmptyOption) {
    return [{ label: '', value: '' }, ...targetGroups];
  }
  return targetGroups;
}

export type TargetAgeGroupOptionType = ReturnType<
  typeof useTargetAgeGroupSelectorOptions
>[number];

type TargetAgeGroupSelectorProps = Omit<
  SingleSelectProps<TargetAgeGroupOptionType>,
  | 'options'
  | 'clearButtonAriaLabel'
  | 'selectedItemRemoveButtonAriaLabel'
  | 'placeholder'
  | 'value'
  | 'defaultValue'
> & {
  value?: TargetAgeGroupOptionType | TargetAgeGroupOptionType['value'];
  defaultValue?: TargetAgeGroupOptionType | TargetAgeGroupOptionType['value'];
};

/**
 * TargetAgeGroupSelector is a wrapper component for the HDS Select component,
 * providing a dropdown for selecting an age-based target group (e.g., babies, children, youth, adults, seniors).
 *
 * The options are generated in a specific order defined by `TARGET_GROUP_AGE_GROUPS_IN_ORDER`
 * and are translated using the search translation hook.
 *
 * @component
 * @param props - Props inherited from HDS SingleSelect, except for options and
 * some ARIA/placeholder props which are handled internally.
 * @returns A Select dropdown for choosing a target group.
 *
 * @example
 * ```tsx
 * <TargetAgeGroupSelector
 *   label="Target group"
 *   value={selectedGroup}
 *   onChange={handleChange}
 * />
 * ```
 */
function TargetAgeGroupSelector({
  label,
  value,
  defaultValue,
  ...rest
}: TargetAgeGroupSelectorProps) {
  const { t: tSearch } = useSearchTranslation();

  const options = useTargetAgeGroupSelectorOptions();
  const valueOption = options.find((option) => option.value === value);
  const defaultValueOption = options.find(
    (option) => option.value === defaultValue
  );

  return (
    <Select
      {...rest}
      options={options}
      visibleOptions={options.length + 1} // Show all options without scroll
      value={valueOption}
      defaultValue={defaultValueOption}
      icon={<IconGroup />}
      clearButtonAriaLabel={tSearch('search.targetAgeGroup.clear')}
      selectedItemRemoveButtonAriaLabel={tSearch(
        'search.targetAgeGroup.removeSelected'
      )}
      placeholder={tSearch('search.targetAgeGroup.placeholder')}
      label={label ?? ''} // ts(2322)
      aria-labelledby={undefined} // Type 'string' is not assignable to type 'undefined'.ts(2322)
    />
  );
}

export default TargetAgeGroupSelector;
