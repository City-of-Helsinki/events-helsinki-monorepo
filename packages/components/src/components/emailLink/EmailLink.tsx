import { IconEnvelope } from 'hds-react';
import type { LinkProps } from 'react-helsinki-headless-cms';
import { Link } from 'react-helsinki-headless-cms';

type EmailLinkProps = {
  email: string;
} & Omit<LinkProps, 'href'>;

export default function EmailLink(props: EmailLinkProps) {
  const {
    email: untrimmedEmail,
    size,
    showExternalIcon,
    iconRight,
    ...delegatedProps
  } = props;
  const trimmedEmail = untrimmedEmail.trim();

  return (
    <Link
      {...delegatedProps}
      href={`mailto:${trimmedEmail}`}
      size={size ?? 'L'}
      showExternalIcon={showExternalIcon ?? false}
      iconRight={iconRight ?? <IconEnvelope aria-hidden />}
    >
      {trimmedEmail}
    </Link>
  );
}
