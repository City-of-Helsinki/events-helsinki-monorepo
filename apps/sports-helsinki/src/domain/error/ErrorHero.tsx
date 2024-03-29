import { Container, Icon404, isTestEnv } from '@events-helsinki/components';
import classNames from 'classnames';
import { Koros } from 'hds-react';
import React from 'react';

import styles from './errorHero.module.scss';

interface Props {
  children: React.ReactNode;
  smallMargin?: boolean;
  text: string;
  title: string;
}

const NotFound: React.FC<Props> = ({
  children,
  smallMargin = false,
  text,
  title,
}) => {
  return (
    <>
      <div className={styles.errorHero}>
        <Container>
          <Icon404 className={styles.icon} />
          <h1>{title}</h1>
          <p>{text}</p>
          <div className={styles.linkWrapper}>{children}</div>
        </Container>
      </div>

      {!isTestEnv && (
        /* istanbul ignore next */
        <Koros
          className={classNames(styles.koros, {
            [styles.smallMargin]: smallMargin,
          })}
          flipVertical={true}
          type="basic"
        />
      )}
    </>
  );
};

export default NotFound;
