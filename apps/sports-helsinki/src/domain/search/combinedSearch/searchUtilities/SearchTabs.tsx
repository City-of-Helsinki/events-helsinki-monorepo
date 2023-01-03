import classnames from 'classnames';
import { Button } from 'hds-react';
import React from 'react';
import styles from './searchTabs.module.scss';

export const SearchTab: React.FC<{
  onClick: () => void;
  label: string;
  count: number | null;
  active: boolean;
}> = ({ onClick, label, count, active }) => {
  return (
    <Button
      variant="secondary"
      className={classnames(styles.secondaryButton, {
        [styles.active]: active,
      })}
      onClick={onClick}
    >
      {label} {count ? count : '...'}
    </Button>
  );
};

function SearchTabs({
  children,
}: {
  children: React.ReactComponentElement<typeof SearchTab>[];
}) {
  return <div className={styles.tabs}>{children}</div>;
}

export default SearchTabs;
