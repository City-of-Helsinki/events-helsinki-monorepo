import classNames from 'classnames';
import capitalize from 'lodash/capitalize';
import React from 'react';

import type { Breakpoint } from '../../types';
import styles from './visible.module.scss';

interface Props {
  above?: Breakpoint;
  below?: Breakpoint;
  className?: string;
  children?: React.ReactNode | JSX.Element;
}

const Visible: React.FC<Props> = ({
  above,
  below,
  children,
  className,
  ...rest
}) => {
  return (
    <div
      className={classNames(className, {
        [styles[`above${capitalize(above)}`]]: above,
        [styles[`below${capitalize(below)}`]]: below,
      })}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Visible;
