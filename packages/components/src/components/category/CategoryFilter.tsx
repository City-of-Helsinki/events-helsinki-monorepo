import type { Category } from '@events-helsinki/core';
import classNames from 'classnames';
import type * as CSS from 'csstype';
import { IconAngleRight } from 'hds-react';
import type { FunctionComponent } from 'react';
import React from 'react';
import { Link } from 'react-helsinki-headless-cms';

import styles from './categoryFilter.module.scss';

interface Props extends Category {
  className?: string;
  hasHorizontalPadding?: boolean;
  style?: CSS.Properties;
  href: string;
}

const CategoryFilter: FunctionComponent<Props> = ({
  className,
  hasHorizontalPadding,
  icon,
  style,
  text,
  href,
}) => {
  return (
    <div
      className={classNames(
        styles.categoryFilter,
        {
          [styles.withHorizontalPadding]: hasHorizontalPadding,
        },
        className
      )}
      style={style}
    >
      <Link
        href={href}
        onClick={() => window?.scrollTo({ top: 0 })}
        iconLeft={icon}
        iconRight={<IconAngleRight aria-hidden />}
      >
        {text}
      </Link>
    </div>
  );
};

export default CategoryFilter;
