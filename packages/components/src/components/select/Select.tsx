import classNames from 'classnames';
import type { SelectProps } from 'hds-react';
import { Select as HDSSelect } from 'hds-react';

import styles from './select.module.scss';

type Props = Omit<SelectProps, 'children'> & {
  noOutline?: boolean;
  className?: string;
};

export default function Select({
  className,
  noOutline = false,
  ...delegated
}: Props) {
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
