import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import { useState } from 'react';
import { TagComponent as Tag } from 'react-helsinki-headless-cms';

import styles from './keyword.module.scss';

interface Props {
  blackOnMobile?: boolean;
  whiteOnly?: boolean;
  featured?: boolean;
  transparent?: boolean;
  isToday?: boolean;
  isFreeEvent?: boolean;
  hideOnMobile?: boolean;
  keyword: string;
  onClick?: () => void;
  className?: string;
}

const KeywordTag: FunctionComponent<Props> = ({
  blackOnMobile,
  whiteOnly,
  hideOnMobile,
  transparent,
  isToday,
  isFreeEvent,
  keyword,
  className,
  onClick,
  ...rest
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = onClick
    ? () => {
        setIsSelected(true);
        onClick();
      }
    : undefined;

  return (
    <Tag
      whiteOnly={whiteOnly}
      selected={isSelected}
      className={classNames(
        styles.keyword,
        blackOnMobile && styles.blackOnMobile,
        hideOnMobile && styles.hideOnMobile,
        transparent && styles.transparent,
        isToday && styles.isToday,
        isFreeEvent && styles.isFreeEvent,
        className
      )}
      onClick={handleClick}
      {...rest}
    >
      {keyword}
    </Tag>
  );
};

export default KeywordTag;
