import { Koros } from 'hds-react';

import styles from './heroImage.module.scss';

type Props = {
  readonly desktopImageUri: string;
  readonly withDecoration?: boolean;
};

function HeroImage({ desktopImageUri, withDecoration = true }: Props) {
  return (
    <div className={styles.heroImage}>
      <span
        className={styles.image}
        style={{ backgroundImage: `url(${desktopImageUri})` }}
      />
      {withDecoration && <Koros className={styles.koros} />}
    </div>
  );
}

export default HeroImage;
