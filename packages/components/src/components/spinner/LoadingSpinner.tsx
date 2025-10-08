import classNames from 'classnames';
import type { LoadingSpinnerProps } from 'hds-react';
import { LoadingSpinner } from 'hds-react';
import type { FunctionComponent } from 'react';
import React from 'react';

import useCommonTranslation from '../../hooks/useCommonTranslation';
import styles from './loadingSpinner.module.scss';

interface Props {
  hasPadding?: boolean;
  isLoading: boolean;
  children?: React.ReactNode;
  className?: string;
  /**
   * Value for aria-valuenow attribute. Required unless the loading status is indeterminate.
   */
  valuenow?: LoadingSpinnerProps['valuenow'];
  small?: LoadingSpinnerProps['small'];
  multicolor?: LoadingSpinnerProps['multicolor'];
}

const LoadingSpinnerri: FunctionComponent<Props> = ({
  hasPadding = true,
  isLoading,
  children,
  className,
  valuenow,
  multicolor = true,
  small = false,
}) => {
  const { t } = useCommonTranslation();
  const loadingFinishedText = t('common:loadingSpinner.loadingFinishedText');
  const loadingText = t('common:loadingSpinner.loadingText');

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
            <LoadingSpinner
              multicolor={multicolor}
              loadingFinishedText={loadingFinishedText}
              loadingText={loadingText}
              valuenow={valuenow}
              small={small}
            />
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default LoadingSpinnerri;
