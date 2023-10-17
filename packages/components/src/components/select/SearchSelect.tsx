import classNames from 'classnames';
import styles from './searchSelect.module.scss';
import Select from './Select';

/** Select-component with Search form styles. */
export default function SearchSelect({
  // FIXME: While the HDS-select is bugged, the value property cannot be used, or the value control fails.
  // While the bug exists, we are using the defaultValue instead...
  // value,
  defaultValue: value,
  ...rest
}: Parameters<typeof Select>[0]) {
  // The value can be an array of options, a single option, null or undefined.
  // The option value can also be empty!
  const hasValue = Array.isArray(value) ? value.length : !!value?.value;
  return (
    <Select
      {...rest}
      value={undefined}
      defaultValue={value}
      className={classNames([
        styles.searchSelect,
        {
          [styles.isSelected]: hasValue,
        },
      ])}
    />
  );
}
