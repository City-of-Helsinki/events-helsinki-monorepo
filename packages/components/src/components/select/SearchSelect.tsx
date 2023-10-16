import classNames from 'classnames';
import styles from './searchSelect.module.scss';
import Select from './Select';

/** Select-component with Search form styles. */
export default function SearchSelect(props: Parameters<typeof Select>[0]) {
  return (
    <Select
      {...props}
      className={classNames([
        styles.searchSelect,
        {
          [styles.isSelected]: !!props.value,
        },
      ])}
    />
  );
}
