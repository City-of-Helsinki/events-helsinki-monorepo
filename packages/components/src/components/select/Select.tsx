import classNames from 'classnames';
import type { SelectProps } from 'hds-react';
import { Select as HDSSelect } from 'hds-react';

import type { Option } from '../../types/types';
import styles from './select.module.scss';

type Props<Option> = Omit<SelectProps<Option>, 'children'> & {
  noOutline?: boolean;
  className?: string;
};

export default function Select({
  className,
  noOutline = false,
  ...delegated
}: Props<Option>) {
  return (
    <HDSSelect
      {...delegated}
      className={classNames(
        styles.select,
        { [styles.selectNoOutline]: noOutline },
        className
      )}
    />
  );
}
