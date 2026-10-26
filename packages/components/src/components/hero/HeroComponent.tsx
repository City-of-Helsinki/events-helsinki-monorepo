import {
  Link,
  useHeadlessCmsLink,
  HtmlToReact,
} from '@city-of-helsinki/react-helsinki-headless-cms';
import Text from '../text/Text';
import styles from './heroComponent.module.scss';

type Props = {
  readonly title: string;
  readonly description: string;
  readonly cta: {
    readonly label: string;
    readonly href: string;
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
