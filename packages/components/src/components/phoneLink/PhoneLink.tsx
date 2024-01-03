import { IconPhone } from 'hds-react';
import type { LinkProps } from 'react-helsinki-headless-cms';
import { Link } from 'react-helsinki-headless-cms';

type PhoneLinkProps = {
  phone: string;
} & Omit<LinkProps, 'href'>;

export default function PhoneLink(props: PhoneLinkProps) {
  const {
    phone: untrimmedPhone,
    size,
    showExternalIcon,
    iconRight,
    ...delegatedProps
  } = props;
  const trimmedPhone = untrimmedPhone.trim();

  return (
    <Link
      {...delegatedProps}
      href={`tel:${trimmedPhone}`}
      size={size ?? 'L'}
      showExternalIcon={showExternalIcon ?? false}
      iconRight={iconRight ?? <IconPhone aria-hidden />}
    >
      {trimmedPhone}
    </Link>
  );
}
