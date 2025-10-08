import type { IconProps } from 'hds-react';
import { IconArrowRight } from 'hds-react';
import LoadingSpinner from '../../components/spinner/LoadingSpinner';
import styles from './arrowRightWithLoadingIndicator.module.scss';

type LoadableProps = {
  loading: boolean;
};

const ArrowRightWithLoadingIndicator: React.FC<LoadableProps & IconProps> = ({
  loading,
  ...props
}) => {
  return loading ? (
    <LoadingSpinner
      isLoading
      hasPadding={false}
      className={styles.loadingSpinner}
    />
  ) : (
    <IconArrowRight {...(props as IconProps)} />
  );
};

export default ArrowRightWithLoadingIndicator;
