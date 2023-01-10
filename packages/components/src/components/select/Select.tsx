import classNames from 'classnames';
import type { SelectProps } from 'hds-react';
import { Select as HDSSelect } from 'hds-react';

import type { OptionType } from '../../types/types';
import styles from './select.module.scss';

type Props<OptionType> = SelectProps<OptionType> & {
  noOutline?: boolean;
};

export default function Select({
  className,
  noOutline = false,
  ...delegated
}: Props<OptionType>) {
  return (
    <HDSSelect<OptionType>
      {...delegated}
      className={classNames(
        styles.select,
        { [styles.selectNoOutline]: !noOutline },
        className
      )}
    />
  );
}
