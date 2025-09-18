import { SrOnly, useSearchTranslation } from '@events-helsinki/components';
import type { SingleSelectProps } from 'hds-react';
import { IconGroup, Select } from 'hds-react';
import { TARGET_GROUP_AGE_GROUPS_IN_ORDER } from '../../../../constants';

/**
 * Get select component options for target group age selection.
 * @param addEmptyOption Should empty be included in options? String shown as label.
 * @returns a list of select options
 */
function useTargetAgeGroupSelectorOptions(emptyOption: string | undefined) {
  const { t: tSearch } = useSearchTranslation();

  const targetGroups = TARGET_GROUP_AGE_GROUPS_IN_ORDER.map((ageGroup) => ({
    label: tSearch(`search.targetAgeGroup.${ageGroup}`),
    value: ageGroup,
  }));

  if (emptyOption !== undefined) {
    return [{ label: emptyOption, value: '' }, ...targetGroups];
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
  defaultValue = '',
  ...rest
}: TargetAgeGroupSelectorProps) {
  const { t: tSearch } = useSearchTranslation();
  const placeholder = tSearch('search.targetAgeGroup.placeholder');
  const options = useTargetAgeGroupSelectorOptions('');
  const valueOption = options.find((option) => option.value === value);
  const defaultValueOption = options.find(
    (option) => option.value === defaultValue
  );

  return (
    <Select
      // Labels aren't visible in search form, but screen reader should read the label.
      // NOTE: the placeholder value is read when value is empty,
      // which easily leads to situation where placeholder is read twice by screen reader.
      //
      label={<SrOnly as="span">{label ?? placeholder}</SrOnly>}
      // Prevent reading the label / placeholder twice by screen reader
      placeholder={!value ? placeholder : undefined}
      {...rest}
      multiselect={false}
      options={options}
      optionLabelField="label"
      optionKeyField="value"
      visibleOptions={options.length + 1} // Show all options without scroll
      value={valueOption}
      defaultValue={defaultValueOption}
      icon={<IconGroup />}
      clearButtonAriaLabel={tSearch('search.targetAgeGroup.clear')}
      aria-labelledby={undefined} // Type 'string' is not assignable to type 'undefined'.ts(2322)
    />
  );
}

export default TargetAgeGroupSelector;
