import {
  Link,
  useHeadlessCmsLink,
  HtmlToReact,
} from 'react-helsinki-headless-cms';
import Text from '../text/Text';
import styles from './heroComponent.module.scss';

type Props = {
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
};

function HeroComponent({ title, description, cta }: Props) {
  const href = useHeadlessCmsLink(cta.href);
  return (
    <div className={styles.box}>
      <span className={styles.boxHelper}>
        <HtmlToReact>{description}</HtmlToReact>
      </span>
      <Text variant="h2" as="h1" className={styles.boxTitle}>
        {title}
      </Text>
      <Link className={styles.linkButton} href={href}>
        {cta.label}
      </Link>
    </div>
  );
}

export default HeroComponent;
