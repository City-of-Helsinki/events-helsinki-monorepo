import classNames from 'classnames';
import { LoadingSpinner } from 'hds-react';
import type { FunctionComponent } from 'react';
import React from 'react';

import styles from './loadingSpinner.module.scss';

interface Props {
  hasPadding?: boolean;
  isLoading: boolean;
  children?: React.ReactNode;
  className?: string;
}

const LoadingSpinnerri: FunctionComponent<Props> = ({
  hasPadding = true,
  isLoading,
  children,
  className,
}) => {
  return (
    <>
      {isLoading ? (
        <div
          className={classNames(styles.spinnerWrapper, className, 'spinner', {
            [styles.hasPadding]: hasPadding,
          })}
          data-testid="loading-spinner"
        >
          <div className={styles.spinner}>
            <LoadingSpinner multicolor />
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default LoadingSpinnerri;
