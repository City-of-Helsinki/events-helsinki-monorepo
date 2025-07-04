import classNames from 'classnames';

import styles from './searchSelect.module.scss';
import Select from './Select';

/** Select-component with Search form styles. */
export default function SearchSelect(props: Parameters<typeof Select>[0]) {
  const { value, defaultValue, multiselect } = props;
  if (multiselect) {
    throw new Error(
      'The SearchSelect does not support multiselect feature. Use the <MultiSelectDropdown/> instead.'
    );
  }
  if (Array.isArray(value) || Array.isArray(defaultValue)) {
    throw new Error(
      'Values must be singletons! The SearchSelect does not support an array as a value feature. ' +
        'Maybe you should use the <MultiSelectDropdown/> instead.'
    );
  }
  // The value can be a single option, null or undefined.
  // The option value can also be empty!
  const hasValue = !!value?.value;
  return (
    <Select
      {...props}
      multiselect={false}
      className={classNames([
        styles.searchSelect,
        {
          [styles.isSelected]: hasValue,
        },
      ])}
    />
  );
}
