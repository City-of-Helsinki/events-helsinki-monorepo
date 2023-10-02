import { IconCheckCircleFill } from 'hds-react';
import React from 'react';
import styles from './helsinkiCityOwnedIcon.module.scss';

const HelsinkiCityOwnedIcon: React.FC = () => {
  return (
    <span className={styles.helsinkiCityOwnedSpan}>
      &#xFEFF; {/* Zero width no-break space */}
      <IconCheckCircleFill
        className={styles.helsinkiCityOwnedIcon}
        aria-hidden
      />
    </span>
  );
};

export default HelsinkiCityOwnedIcon;
