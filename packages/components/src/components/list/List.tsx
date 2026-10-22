import classNames from 'classnames';
import React from 'react';

import styles from './list.module.scss';

export type ListItemProps = {
  className?: string;
  index: number;
};

type Props = {
  readonly items: React.ReactElement[];
  readonly variant?:
    | 'default'
    | 'collection-grid'
    | 'searchResult'
    | 'grid-3'
    | 'grid-2'
    | 'fixed-grid-4'
    | 'column';
  readonly gap?: 'xs' | 's' | 'm' | 'l';
  readonly li?: React.ComponentType<ListItemProps>;
  readonly listContainerRef?: React.Ref<HTMLUListElement>;
};

function List({
  items,
  variant = 'default',
  li: Li,
  listContainerRef,
  gap,
}: Props) {
  const ListElement = Li ?? 'li';
  return (
    <ul
      ref={listContainerRef}
      className={classNames(styles.list, styles[variant], {
        [styles[`gap-${gap}`]]: gap,
      })}
    >
      {items.map((node: React.ReactElement, index: number) => (
        <ListElement key={node.key} index={index} className={styles.item}>
          {node}
        </ListElement>
      ))}
    </ul>
  );
}

export default List;
