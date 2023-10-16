import classNames from 'classnames';
import type { SelectProps } from 'hds-react';
import { Select as HDSSelect } from 'hds-react';

import type { Option } from '../../types/types';
import styles from './select.module.scss';

type Props<Option> = SelectProps<Option> & {
  noOutline?: boolean;
};

export default function Select({
  className,
  noOutline = false,
  optionLabelField = 'text', // Use Option.text by default as label
  ...delegated
}: Props<Option>) {
  return (
    <HDSSelect<Option>
      {...delegated}
      optionLabelField={optionLabelField}
      className={classNames(
        styles.select,
        { [styles.selectNoOutline]: noOutline },
        className
      )}
    />
  );
}
