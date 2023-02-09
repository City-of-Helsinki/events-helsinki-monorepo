import { useState } from 'react';
import type { LinkProps, CardProps } from 'react-helsinki-headless-cms';
import { Card, LinkBox } from 'react-helsinki-headless-cms';
import LoadingSpinner from '../spinner/LoadingSpinner';
import styles from './loaderLinkBox.module.scss';

type LoaderLinkBoxProps = LinkProps & {
  children: React.ReactNode;
};

const LoaderLinkBox: React.FC<LoaderLinkBoxProps> = ({
  children,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <LinkBox
      {...props}
      onClickCapture={() => {
        setLoading(true);
      }}
    >
      {children}
      <LoadingSpinner isLoading={loading} className={styles.loadingSpinner} />
    </LinkBox>
  );
};

type LoadingWrapperProps = {
  children: React.ReactNode;
};

export const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  return (
    <div
      className={styles.loadingWrapper}
      onClickCapture={() => {
        setLoading(true);
      }}
    >
      {children}
      <div>
        <LoadingSpinner
          isLoading={!loading}
          className={styles.loadingSpinner}
        />
      </div>
    </div>
  );
};

export default LoaderLinkBox;
