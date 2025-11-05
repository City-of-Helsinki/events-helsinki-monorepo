import classNames from 'classnames';

import type { SelectProps } from 'hds-react';
import styles from './searchSelect.module.scss';
import Select from './Select';

/** Select-component with Search form styles. */
export default function SearchSelect(props: SelectProps) {
  const { value, multiSelect } = props;
  if (multiSelect) {
    throw new Error(
      'The SearchSelect does not support multiselect feature. Use the <MultiSelectDropdown/> instead.'
    );
  }
  if (Array.isArray(value)) {
    throw new Error(
      'Values must be singletons! The SearchSelect does not support an array as a value feature. ' +
        'Maybe you should use the <MultiSelectDropdown/> instead.'
    );
  }
  // The value can be a single option, null or undefined.
  // The option value can also be empty!
  const hasValue = !!value;
  return (
    <Select
      {...props}
      multiSelect={false}
      className={classNames([
        styles.searchSelect,
        {
          [styles.isSelected]: hasValue,
        },
      ])}
    />
  );
}
