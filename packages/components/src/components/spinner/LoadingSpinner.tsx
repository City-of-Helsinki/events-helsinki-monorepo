import classNames from 'classnames';
import type { LoadingSpinnerCustomTheme, LoadingSpinnerProps } from 'hds-react';
import { LoadingSpinner as HDSLoadingSpinner } from 'hds-react';
import type { FunctionComponent } from 'react';
import React from 'react';

import useCommonTranslation from '../../hooks/useCommonTranslation';
import styles from './loadingSpinner.module.scss';

type Props = {
  hasPadding?: boolean;
  isLoading: boolean;
  children?: React.ReactNode;
} & Omit<LoadingSpinnerProps, 'loadingFinishedText' | 'loadingText'>;

const defaultTheme: LoadingSpinnerCustomTheme = {
  '--spinner-color-stage1': 'var(--color-coat-of-arms)',
  '--spinner-color-stage2': 'var(--color-copper)',
  '--spinner-color-stage3': 'var(--color-suomenlinna)',
};

const LoadingSpinner: FunctionComponent<Props> = ({
  hasPadding = true,
  isLoading,
  children,
  className,
  multicolor = true,
  theme = defaultTheme,
  ...rest
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
          <HDSLoadingSpinner
            {...rest}
            multicolor={multicolor}
            loadingFinishedText={loadingFinishedText}
            loadingText={loadingText}
            theme={theme}
          />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default LoadingSpinner;
