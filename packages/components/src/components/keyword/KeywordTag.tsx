import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import { TagComponent as Tag } from 'react-helsinki-headless-cms';

import styles from './keyword.module.scss';

interface Props {
  blackOnMobile?: boolean;
  whiteOnly?: boolean;
  featured?: boolean;
  transparent?: boolean;
  hideOnMobile?: boolean;
  keyword: string;
  onClick?: () => void;
}

const KeywordTag: FunctionComponent<Props> = ({
  whiteOnly,
  blackOnMobile,
  hideOnMobile,
  transparent,
  keyword,
  ...rest
}) => {
  return (
    <Tag
      className={classNames(
        styles.keyword,
        blackOnMobile && styles.blackOnMobile,
        hideOnMobile && styles.hideOnMobile,
        transparent && styles.transparent,
        whiteOnly && styles.whiteOnly
      )}
      {...rest}
    >
      {keyword}
    </Tag>
  );
};

export default KeywordTag;
