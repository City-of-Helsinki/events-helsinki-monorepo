import { useLocale, useSearchTranslation } from '@events-helsinki/components';
import classNames from 'classnames';
import type { OptionInProps, SelectProps } from 'hds-react';
import { IconGroup, Select } from 'hds-react';
import { TARGET_GROUP_AGE_GROUPS_IN_ORDER } from '../../../../constants';
import styles from './targetAgeGroup.module.scss';

export type TargetAgeGroupOptionType = OptionInProps;

/**
 * Get select component options for target group age selection.
 * @param addEmptyOption Should empty be included in options? String shown as label.
 * @returns a list of select options
 */
function useTargetAgeGroupSelectorOptions(
  emptyOption: string | undefined
): TargetAgeGroupOptionType[] {
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

type TargetAgeGroupSelectorProps = Omit<
  SelectProps<TargetAgeGroupOptionType>,
  | 'children'
  | 'options'
  | 'clearButtonAriaLabel'
  | 'selectedItemRemoveButtonAriaLabel'
  | ' texts'
> & {
  label?: string;
  className?: string;
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
  className,
  ...rest
}: TargetAgeGroupSelectorProps) {
  const { t: tSearch } = useSearchTranslation();
  const placeholder = tSearch('search.targetAgeGroup.placeholder');
  const options = useTargetAgeGroupSelectorOptions('');
  const locale = useLocale();
  const texts: SelectProps<TargetAgeGroupOptionType>['texts'] = {
    // Labels aren't visible in search form, but screen reader should read the label.
    // NOTE: the placeholder value is read when value is empty,
    // which easily leads to situation where placeholder is read twice by screen reader.
    // TODO: label: <SrOnly as="span">{label ?? placeholder}</SrOnly>,
    // label: label ?? placeholder,
    // Prevent reading the label / placeholder twice by screen reader
    placeholder: !value ? label || placeholder : undefined,
    // TODO: do we need translations for every text copies?
    // clearButtonAriaLabel_one: tSearch('search.targetAgeGroup.clear'),
    language: locale,
  };

  return (
    <Select
      {...rest}
      className={classNames(styles.targetAgeGroupSelector, {
        [String(className)]: !!className,
      })}
      texts={texts}
      options={options}
      multiSelect={false}
      visibleOptions={options.length + 1} // Show all options without scroll
      value={value || undefined}
      icon={<IconGroup aria-hidden />}
    />
  );
}

export default TargetAgeGroupSelector;
