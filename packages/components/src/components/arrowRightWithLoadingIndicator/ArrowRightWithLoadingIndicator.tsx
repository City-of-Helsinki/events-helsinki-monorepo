import type { IconProps } from 'hds-react';
import { IconArrowRight, LoadingSpinner } from 'hds-react';
import styles from './arrowRightWithLoadingIndicator.module.scss';

type LoadableProps = {
  loading: boolean;
};

const ArrowRightWithLoadingIndicator: React.FC<LoadableProps & IconProps> = ({
  loading,
  ...props
}) => {
  return loading ? (
    <LoadingSpinner multicolor className={styles.loadingSpinner} />
  ) : (
    <IconArrowRight {...(props as IconProps)} />
  );
};

export default ArrowRightWithLoadingIndicator;
