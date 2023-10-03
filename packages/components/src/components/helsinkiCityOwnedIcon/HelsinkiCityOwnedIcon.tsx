import { IconCheckCircleFill } from 'hds-react';
import React from 'react';
import styles from './helsinkiCityOwnedIcon.module.scss';

const ZERO_WIDTH_NO_BREAK_SPACE = '\uFEFF';

/**
 * Helsinki city owned icon meant to stay on the same line as the text preceding it.
 */
const HelsinkiCityOwnedIcon: React.FC = () => {
  return (
    <span className={styles.helsinkiCityOwnedSpan}>
      {ZERO_WIDTH_NO_BREAK_SPACE}
      <IconCheckCircleFill
        className={styles.helsinkiCityOwnedIcon}
        aria-hidden
      />
    </span>
  );
};

export default HelsinkiCityOwnedIcon;
